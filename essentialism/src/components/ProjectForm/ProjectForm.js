import { API, graphqlOperation } from "aws-amplify";
import React, { Component } from "react";
import { createProject } from "../../graphql/mutations";
import { Button, Input } from "../Global.Styles";
import ProjectList from "../ProjectList/ProjectList";

export default class ProjectForm extends Component {
  state = {
    name: "",
    description: "",
    projects: []
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async e => {
    const { name, description, projects } = this.state;
    e.preventDefault();
    const input = { name, description };
    const result = await API.graphql(
      graphqlOperation(createProject, { input })
    );
    const newProject = result.data.createProject;
    const updatedProjects = [newProject, ...projects];

    this.setState({ name: "", description: "", projects: updatedProjects });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter your Project
            <Input
              type="text"
              name="name"
              project={this.state.name}
              onChange={this.handleChange}
              placeholder="Project Name"
            />
          </label>
          <label>
            Describe your Project
            <Input
              type="text"
              name="description"
              project={this.state.description}
              onChange={this.handleChange}
              placeholder="Enter a description for your project"
            />
          </label>
          <Button type="submit" bg="Black" m={1}>
            Add Project
          </Button>
        </form>
        <ProjectList projects={this.state.projects} />
      </div>
    );
  }
}
