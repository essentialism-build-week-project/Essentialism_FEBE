import React, { Component } from "react";
import { Box } from "rebass";
import { Button, Input } from "../Global.Styles";
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
              <p>Enter a name for your project</p>
              <Input
                type="text"
                name="projectName"
                value={this.props.name}
                onChange={this.props.handleChange}
                placeholder="Project Name"
              />
            </label>
            <label>
              <p>Give a brief description of your Project</p>
              <Input
                type="text"
                name="projectDescription"
                value={this.props.description}
                onChange={this.props.handleChange}
                placeholder="Description of project"
              />
            </label>
            <Box>
              <Button type="submit" bg="Black" mt={3}>
                {this.props.id === "" ? "Add Project" : "Modify Project"}
              </Button>
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
