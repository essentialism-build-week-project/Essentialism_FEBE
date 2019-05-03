import { Button, Heading, TextInput, Box } from "grommet";
import React, { Component } from "react";
// import { Box } from "rebass";
import ValueList from "../ValueList/ValueList";

export default class ValueForm extends Component {
  componentDidMount = async () => {
    this.props.initialLoad();
  };

  render() {
    return (
      <div>
        <Box size="large">
          <form onSubmit={this.props.handleSubmit}>
            <label>
              <Heading margin="xsmall" level="5">
                Enter a name of something you value
              </Heading>

              <TextInput
                name="valueName"
                placeholder="Name of value"
                value={this.props.name}
                onChange={this.props.handleChange}
                color="#00739D"
              />
            </label>
            <label>
              <Heading margin="xsmall" level="5">
                Give a brief description of your value
              </Heading>
              <TextInput
                name="valueDescription"
                placeholder="Description for value"
                value={this.props.description}
                onChange={this.props.handleChange}
              />
            </label>
            <Box>
              <Button
                label={this.props.id === "" ? "Add Value" : "Modify Value"}
                color="#00739D"
                type="submit"
                margin="small"
              />
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
