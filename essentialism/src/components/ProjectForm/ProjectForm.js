import { Button as GromButton, Heading, TextInput } from "grommet";
import React, { Component } from "react";
import { Box } from "rebass";
import ProjectList from "../ProjectList/ProjectList";

export default class ProjectForm extends Component {
  componentDidMount = async () => {
    this.props.initialLoad();
  };

  render() {
    return (
      <div>
        <Box mb={3}>
          <form onSubmit={this.props.handleSubmit}>
            <label>
              <Heading margin="xsmall" level="5">
                Enter a name for your project
              </Heading>
              <TextInput
                name="projectName"
                placeholder="Name of project"
                value={this.props.name}
                onChange={this.props.handleChange}
                color="#6495ED"
              />
            </label>
            <label>
              <Heading margin="xsmall" level="5">
                Give a brief description of your Project
              </Heading>
              <TextInput
                name="projectDescription"
                placeholder="Description of project"
                value={this.props.description}
                onChange={this.props.handleChange}
                color="#00739D"
              />
            </label>

            <Box>
              <GromButton
                label={this.props.id === "" ? "Add Project" : "Modify Project"}
                color="#00739D"
                type="submit"
                margin="small"
              />
            </Box>
          </form>
        </Box>
        <ProjectList
          handleFilter={this.props.handleFilter}
          onDragEnd={this.props.onDragEnd}
          handleModify={this.props.handleModify}
          handleChange={this.props.handleChange}
          handleDelete={this.props.handleDelete}
          projects={this.props.projects}
          modify={this.props.id === ""}
          isFiltered={this.props.isFiltered}
        />
      </div>
    );
  }
}
