import { API, graphqlOperation } from "aws-amplify";
import React, { Component } from "react";
import { Box } from "rebass";
import {
  createProject,
  deleteProject,
  updateProject
} from "../../graphql/mutations";
import { listProjects } from "../../graphql/queries";
import { Button, Input } from "../Global.Styles";
import ProjectList from "../ProjectList/ProjectList";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

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

  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const projects = reorder(
      this.state.projects,
      result.source.index,
      result.destination.index
    );

    this.setState({
      projects
    });
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

      this.setState({
        name: "",
        description: "",
        projects: updatedProjects
      });
    }
  };

  render() {
    return (
      <div>
        <Box mb={3}>
          <form onSubmit={this.handleSubmit}>
            <label>
              <p>Enter a name for your project</p>
              <Input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                placeholder="Project Name"
              />
            </label>
            <label>
              <p>Give a brief description of your Project</p>
              <Input
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
                placeholder="Description of project"
              />
            </label>
            <Box>
              <Button type="submit" bg="Black" mt={3}>
                Add Project
              </Button>
            </Box>
          </form>
        </Box>
        <ProjectList
          onDragEnd={this.onDragEnd}
          handleModify={this.handleModify}
          handleChange={this.handleChange}
          handleDelete={this.handleDelete}
          projects={this.state.projects}
        />
      </div>
    );
  }
}
