import Amplify, { API, graphqlOperation } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import React from "react";
import { Flex } from "rebass";
import awsmobile from "./aws-exports";
import { Container } from "./components/Global.Styles";
import ModalView from "./components/Modal/Modal";
import ProjectForm from "./components/ProjectForm/ProjectForm";
import ValueForm from "./components/ValueForm/ValueForm";
import { createValue, deleteValue, updateValue } from "./graphql/mutations";
import { listValues } from "./graphql/queries";

Amplify.configure(awsmobile);

const reorder = (list, startIndex, endIndex) => {
  //will work for both value and project
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class App extends React.Component {
  state = {
    name: "",
    description: "",
    id: "",
    isFiltered: false,
    values: []
  };

  initialLoad = async () => {
    try {
      const result = await API.graphql(graphqlOperation(listValues));
      const values = result.data.listValues.items;
      this.setState({ values });
    } catch (err) {
      console.log("Error listing values:", err);
    }
  };

  handleFilter = () => {
    this.setState({ isFiltered: !this.state.isFiltered });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleModify = async value => {
    this.setState(value);
  };

  handleDelete = async value => {
    const { id } = value;
    try {
      const input = { id };
      const result = await API.graphql(
        graphqlOperation(deleteValue, { input })
      );
      const deletedValue = result.data.deleteValue;
      const updateValues = this.state.values.filter(
        value => value.id !== deletedValue.id
      );
      this.setState({ values: updateValues });
    } catch (err) {
      console.log(err);
    }
  };

  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const values = reorder(
      this.state.values,
      result.source.index,
      result.destination.index
    );

    this.setState({
      values
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { name, description, values, id } = this.state;
    if (id !== "") {
      const input = { id, name, description };
      const result = await API.graphql(
        graphqlOperation(updateValue, { input })
      );
      const updatedValue = result.data.updateValue;
      const index = values.findIndex(value => value.id === this.state.id);
      const updatedValues = [
        ...this.state.values.slice(0, index),
        updatedValue,
        ...this.state.values.slice(index + 1)
      ];
      this.setState({
        name: "",
        description: "",
        id: "",
        values: updatedValues
      });
    } else {
      const input = { name, description };
      const result = await API.graphql(
        graphqlOperation(createValue, { input })
      );
      const newValue = result.data.createValue;
      const updatedValues = [newValue, ...values];

      this.setState({ name: "", description: "", values: updatedValues });
    }
  };

  render() {
    const { name, description, id, isFiltered, values } = this.state;
    return (
      <Container>
        <Flex justifyContent="space-around" pt={5}>
          <ValueForm
            name={name}
            description={description}
            id={id}
            isFiltered={isFiltered}
            values={values}
            initialLoad={this.initialLoad}
            handleFilter={this.handleFilter}
            handleChange={this.handleChange}
            handleModify={this.handleModify}
            handleDelete={this.handleDelete}
            onDragEnd={this.onDragEnd}
            handleSubmit={this.handleSubmit}
          />
          <ProjectForm />
          <ModalView />
        </Flex>
      </Container>
    );
  }
}

export default withAuthenticator(App, true);
