import { API, graphqlOperation } from "aws-amplify";
import React, { Component } from "react";
import { createProject, deleteProject } from "../../graphql/mutations";
import { Button, Input } from "../Global.Styles";
import ProjectList from "../ProjectList/ProjectList";

export default class ProjectForm extends Component {
  state = {
    name: "",
    description: "",
    id: "",
    projects: []
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log("update");
  };

  handleModify = async value => {
    this.setState(value);
  };

  handleDelete = async project => {
    const { id } = project;
    try {
      const input = { id };
      const result = await API.graphql(
        graphqlOperation(deleteProject, { input })
      );
      const deletedProject = result.data.deleteProject;
      const updateProjects = this.state.projects.filter(
        value => value.id !== deletedProject.id
      );
      this.setState({ projects: updateProjects });
    } catch (err) {
      console.log(err);
    }
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
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="Project Name"
            />
          </label>
          <label>
            Describe your Project
            <Input
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
              placeholder="Enter a description for your project"
            />
          </label>
          <Button type="submit" bg="Black" m={1}>
            Add Project
          </Button>
        </form>
        <ProjectList
          handleChange={this.handleChange}
          handleDelete={this.handleDelete}
          projects={this.state.projects}
        />
      </div>
    );
  }
}
