import { Box, Button, Form, FormField, Stack, Text } from "grommet";
import { AddCircle, Edit } from 'grommet-icons';
import React, { Component } from "react";
import ProjectList from "../ProjectList/ProjectList";

export default class ProjectForm extends Component {
  componentDidMount = async () => {
    this.props.initialLoad();
  };

  render() {
    return (
      <div>
        <Box margin='large'>
          <Form onSubmit={this.props.handleSubmit}>
            <label>
              <FormField
                name="projectName"
                placeholder="Name of project"
                value={this.props.name}
                onChange={this.props.handleChange}
                color="#6495ED"
              />
            </label>
            <label>
              <FormField
                name="projectDescription"
                placeholder="Description of project"
                value={this.props.description}
                onChange={this.props.handleChange}
                color="#00739D"
              />
            </label>

            <Box>
              <Stack anchor='top'>
              <Button
                label={this.props.id === "" ? "Project" : "Modify Project"}
                icon={this.props.id === '' ? <AddCircle color='brand' /> : <Edit color='brand' />}
                type="submit"
                margin="small"
              />
                {this.props.projects.length < 3 ? (
                  <Box
                    round
                    background="status-disabled"
                    pad={{ horizontal: 'xsmall' }}
                  >
                    <Text>{this.props.projects.length}</Text>
                  </Box>
                ) : (
                    <Box
                      round
                      background="accent-1"
                      pad={{ horizontal: 'xsmall' }}
                    >
                      <Text>{this.props.projects.length}</Text>
                    </Box>
                  )}
              </Stack>
            </Box>
          </Form>
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
