import { API, graphqlOperation } from "aws-amplify";
import React, { Component } from "react";
import { createValue } from "../../graphql/mutations";
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
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="Name"
            />
          </label>
          <label>
            Describe your value
            <input
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
              placeholder="Enter a description for your value"
            />
          </label>
          <button type="submit">Add Value</button>
        </form>
        <ValueList values={this.state.values} />
      </div>
    );
  }
}
