import { API, graphqlOperation } from "aws-amplify";
import React, { Component } from "react";
import { createValue, deleteValue } from "../../graphql/mutations";
import { Button, Input } from "../Global.Styles";
import ValueList from "../ValueList/ValueList";

export default class ValueForm extends Component {
  state = {
    name: "",
    description: "",
    values: []
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleDelete = async value => {
    const { id } = value;
    try {
      const input = { id };
      const result = await API.graphql(
        graphqlOperation(deleteValue, { input })
      );
      const test = result.data.deleteValue;
      console.log("Test:", test);
    } catch (err) {
      console.log(err);
    }
  };

  handleSubmit = async e => {
    const { name, description, values } = this.state;
    e.preventDefault();
    const input = { name, description };
    const result = await API.graphql(graphqlOperation(createValue, { input }));
    const newValue = result.data.createValue;
    const updatedValues = [newValue, ...values];

    this.setState({ name: "", description: "", values: updatedValues });
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
            Add Project
          </Button>
        </form>
        <ValueList
          handleDelete={this.handleDelete}
          values={this.state.values}
        />
      </div>
    );
  }
}
