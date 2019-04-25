import { API, graphqlOperation } from "aws-amplify";
import React, { Component } from "react";
import { createValue, deleteValue, updateValue } from "../../graphql/mutations";
import { Button, Input } from "../Global.Styles";
import ValueList from "../ValueList/ValueList";

export default class ValueForm extends Component {
  state = {
    name: "",
    description: "",
    id: "",
    values: []
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
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter your value
            <Input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="Name"
            />
          </label>
          <label>
            Describe your value
            <Input
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
              placeholder="Enter a description for your value"
            />
          </label>
          <Button type="submit" bg="Black" m={1}>
            {this.state.id === "" ? "Add Value" : "Modify Value"}
          </Button>
        </form>
        <ValueList
          handleModify={this.handleModify}
          handleDelete={this.handleDelete}
          values={this.state.values}
          modify={this.state.id === ""}
        />
      </div>
    );
  }
}
