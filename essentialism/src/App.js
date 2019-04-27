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
    valueName: "",
    valueDescription: "",
    valueId: "",
    valueIsFiltered: false,
    values: []
  };

  initialValueLoad = async () => {
    try {
      const result = await API.graphql(graphqlOperation(listValues));
      const values = result.data.listValues.items;
      this.setState({ values });
    } catch (err) {
      console.log("Error listing values:", err);
    }
  };

  handleValueFilter = () => {
    this.setState({ valueIsFiltered: !this.state.valueIsFiltered });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleValueModify = async value => {
    this.setState({
      valueId: value.id,
      valueName: value.name,
      valueDescription: value.description
    });
  };

  handleValueDelete = async value => {
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

  onValueDragEnd = result => {
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

  handleValueSubmit = async e => {
    e.preventDefault();
    const { valueName, valueDescription, values, valueId } = this.state;
    if (valueId !== "") {
      const input = {
        id: valueId,
        name: valueName,
        description: valueDescription
      };
      const result = await API.graphql(
        graphqlOperation(updateValue, { input })
      );
      const updatedValue = result.data.updateValue;
      const index = values.findIndex(value => value.id === this.state.valueId);
      const updatedValues = [
        ...this.state.values.slice(0, index),
        updatedValue,
        ...this.state.values.slice(index + 1)
      ];
      this.setState({
        valueName: "",
        valueDescription: "",
        valueId: "",
        values: updatedValues
      });
    } else {
      const input = { name: valueName, description: valueDescription };
      const result = await API.graphql(
        graphqlOperation(createValue, { input })
      );
      const newValue = result.data.createValue;
      const updatedValues = [newValue, ...values];

      this.setState({
        valueName: "",
        valueDescription: "",
        values: updatedValues
      });
    }
  };

  render() {
    const {
      valueName,
      valueDescription,
      valueId,
      valueIsFiltered,
      values
    } = this.state;
    return (
      <Container>
        <Flex justifyContent="space-around" pt={5}>
          <ValueForm
            name={valueName}
            description={valueDescription}
            id={valueId}
            isFiltered={valueIsFiltered}
            values={values}
            initialLoad={this.initialValueLoad}
            handleFilter={this.handleValueFilter}
            handleChange={this.handleChange}
            handleModify={this.handleValueModify}
            handleDelete={this.handleValueDelete}
            onDragEnd={this.onValueDragEnd}
            handleSubmit={this.handleValueSubmit}
          />
          <ProjectForm />
          <ModalView />
        </Flex>
      </Container>
    );
  }
}

export default withAuthenticator(App, true);
