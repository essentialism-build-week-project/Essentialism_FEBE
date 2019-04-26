import { API, graphqlOperation } from "aws-amplify";
import React, { Component } from "react";
import { Box } from "rebass";
import { createValue, deleteValue, updateValue } from "../../graphql/mutations";
import { listValues } from "../../graphql/queries";
import { Button, Input } from "../Global.Styles";
import ValueList from "../ValueList/ValueList";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default class ValueForm extends Component {
  state = {
    name: "",
    description: "",
    id: "",
    isFiltered: false,
    values: []
  };

  componentDidMount = async () => {
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
    return (
      <div>
        <Box mb={3}>
          <form onSubmit={this.handleSubmit}>
            <label>
              <p>Enter a name of something you value</p>
              <Input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                placeholder="Name of value"
              />
            </label>
            <label>
              <p>Give a brief description of your value</p>
              <Input
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
                placeholder="Description for value"
              />
            </label>
            <Box>
              <Button type="submit" bg="Black" mt={3}>
                {this.state.id === "" ? "Add Value" : "Modify Value"}
              </Button>
            </Box>
          </form>
        </Box>
        <ValueList
          handleFilter={this.handleFilter}
          onDragEnd={this.onDragEnd}
          handleModify={this.handleModify}
          handleDelete={this.handleDelete}
          values={this.state.values}
          modify={this.state.id === ""}
          isFiltered={this.state.isFiltered}
        />
      </div>
    );
  }
}
