import React, { Component } from "react";
import { Box } from "rebass";
import { Button, Input } from "../Global.Styles";
import ValueList from "../ValueList/ValueList";

export default class ValueForm extends Component {
  componentDidMount = async () => {
    this.props.initialLoad();
  };

  render() {
    return (
      <div>
        <Box mb={3}>
          <form onSubmit={this.props.handleSubmit}>
            <label>
              <p>Enter a name of something you value</p>
              <Input
                type="text"
                name="name"
                value={this.props.name}
                onChange={this.props.handleChange}
                placeholder="Name of value"
              />
            </label>
            <label>
              <p>Give a brief description of your value</p>
              <Input
                type="text"
                name="description"
                value={this.props.description}
                onChange={this.props.handleChange}
                placeholder="Description for value"
              />
            </label>
            <Box>
              <Button type="submit" bg="Black" mt={3}>
                {this.props.id === "" ? "Add Value" : "Modify Value"}
              </Button>
            </Box>
          </form>
        </Box>
        <ValueList
          handleFilter={this.props.handleFilter}
          onDragEnd={this.props.onDragEnd}
          handleModify={this.props.handleModify}
          handleDelete={this.props.handleDelete}
          values={this.props.values}
          modify={this.props.id === ""}
          isFiltered={this.props.isFiltered}
        />
      </div>
    );
  }
}
