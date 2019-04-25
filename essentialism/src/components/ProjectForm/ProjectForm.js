import { API, graphqlOperation } from "aws-amplify";
import React, { Component } from "react";
import {
  createProject,
  deleteProject,
  updateProject
} from "../../graphql/mutations";
import { listProjects } from "../../graphql/queries";
import { Button, Input } from "../Global.Styles";
import ProjectList from "../ProjectList/ProjectList";

export default class ProjectForm extends Component {
  state = {
    name: "",
    description: "",
    id: "",
    projects: []
  };

  componentDidMount = async () => {
    try {
      const result = await API.graphql(graphqlOperation(listProjects));
      const projects = result.data.listProjects.items;
      this.setState({ projects });
    } catch (err) {
      console.log("Error listing projects:", err);
    }
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
    e.preventDefault();
    const { name, description, projects, id } = this.state;
    if (id !== "") {
      const input = { id, name, description };
      const result = await API.graphql(
        graphqlOperation(updateProject, { input })
      );
      const updatedProject = result.data.updateProject;
      const index = projects.findIndex(project => project.id === this.state.id);
      const updatedProjects = [
        ...this.state.projects.slice(0, index),
        updatedProject,
        ...this.state.projects.slice(index + 1)
      ];
      this.setState({
        name: "",
        description: "",
        id: "",
        projects: updatedProjects
      });
    } else {
      const input = { name, description };
      const result = await API.graphql(
        graphqlOperation(createProject, { input })
      );
      const newProject = result.data.createProject;
      const updatedProjects = [newProject, ...projects];

      this.setState({ name: "", description: "", projects: updatedProjects });
    }
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
          handleModify={this.handleModify}
          handleChange={this.handleChange}
          handleDelete={this.handleDelete}
          projects={this.state.projects}
        />
      </div>
    );
  }
}
