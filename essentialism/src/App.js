import Amplify, { API, graphqlOperation } from "aws-amplify";
import { AmplifyTheme, withAuthenticator } from "aws-amplify-react";
import { Box, Button, Grommet } from "grommet";
import { ResponsiveContext } from "grommet/contexts";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import React from "react";
import awsmobile from "./aws-exports";
import FinalPage from "./components/FinalPage/FinalPage";
import { Wrapper } from "./components/Global.Styles";
import { theme as GromTheme } from "./components/GrommetTheme";
import ModalView from "./components/Modal/Modal";
import ProjectForm from "./components/ProjectForm/ProjectForm";
import ValueForm from "./components/ValueForm/ValueForm";
import {
  createProject,
  createValue,
  deleteProject,
  deleteValue,
  updateProject,
  updateValue
} from "./graphql/mutations";
import { listProjects, listValues } from "./graphql/queries";

Amplify.configure(awsmobile);

NProgress.configure({ showSpinner: false });

const reorder = (list, startIndex, endIndex) => {
  //will work for both value and project
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

// const customBreakpoints = deepMerge(grommet, {
//   global: {
//     breakpoints: {
//       xsmall: {
//         value: 500
//       },
//       small: {
//         value: 900
//       },
//       medium: undefined,
//       middle: {
//         value: 3000
//       }
//     }
//   }
// });

class App extends React.Component {
  state = {
    valueName: "",
    valueDescription: "",
    valueId: "",
    valueIsFiltered: false,
    projectName: "",
    projectDescription: "",
    projectId: "",
    projectIsFiltered: false,
    values: [],
    projects: [],
    modalDesc: "",
    showModal: false
  };

  handleModalSubmit = modalDesc => {
    this.setState({ modalDesc });
  };

  initialValueLoad = async () => {
    try {
      NProgress.start();
      const result = await API.graphql(graphqlOperation(listValues));
      const values = result.data.listValues.items;
      this.setState({ values }, () => NProgress.done());
    } catch (err) {
      console.log("Error listing values:", err);
    }
  };

  handleValueFilter = () => {
    this.setState({ valueIsFiltered: !this.state.valueIsFiltered });
  };

  handleValueFilter = () => {
    this.setState({ valueIsFiltered: !this.state.valueIsFiltered });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleValueModify = async value => {
    
      this.setState({
        valueId: value.id,
        valueName: value.name,
        valueDescription: value.description
      });
  
  };
  handleValueDelete = async value => {
    const { id } = value;
    try {
      NProgress.start();
      const input = { id };
      const result = await API.graphql(
        graphqlOperation(deleteValue, { input })
      );
      const deletedValue = result.data.deleteValue;
      const updateValues = this.state.values.filter(
        value => value.id !== deletedValue.id
      );
      this.setState({ values: updateValues }, () => NProgress.done());
    } catch (err) {
      console.log(err);
    }
  };

  handleValueDelete = async value => {
    const { id } = value;
    try {
      const input = { id };
      const result = await API.graphql(
        graphqlOperation(deleteValue, { input })
      );
      const deletedValue = result.data.deleteValue;
      const updateValues = this.state.values.filter(
        value => value.id !== deletedValue.id
      );
      this.setState({ values: updateValues,valueId:"", valueName:"", valueDescription:"" });
    } catch (err) {
      console.log(err);
    }
  };

  onValueDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const values = reorder(
      this.state.values,
      result.source.index,
      result.destination.index
    );
    this.setState({
      values
    });
  };

  handleValueSubmit = async e => {
    e.preventDefault();
    const { valueName, valueDescription, values, valueId } = this.state;
    if (valueId !== "") {
      NProgress.start();
      const input = {
        id: valueId,
        name: valueName,
        description: valueDescription
      };
      const result = await API.graphql(
        graphqlOperation(updateValue, { input })
      );
      const updatedValue = result.data.updateValue;
      const index = values.findIndex(value => value.id === this.state.valueId);
      const updatedValues = [
        ...this.state.values.slice(0, index),
        updatedValue,
        ...this.state.values.slice(index + 1)
      ];
      this.setState(
        {
          valueName: "",
          valueDescription: "",
          valueId: "",
          values: updatedValues
        },
        () => NProgress.done()
      );
    } else {
      NProgress.start();
      const input = { name: valueName, description: valueDescription };
      const result = await API.graphql(
        graphqlOperation(createValue, { input })
      );
      const newValue = result.data.createValue;
      const updatedValues = [newValue, ...values];

      this.setState(
        {
          valueName: "",
          valueDescription: "",
          values: updatedValues
        },
        () => NProgress.done()
      );
    }
  };

  initialProjectLoad = async () => {
    try {
      NProgress.start();
      const result = await API.graphql(graphqlOperation(listProjects));
      const projects = result.data.listProjects.items;
      this.setState({ projects }, () => NProgress.done());
    } catch (err) {
      console.log("Error listing projects:", err);
    }
  };

  initialProjectLoad = async () => {
    try {
      const result = await API.graphql(graphqlOperation(listProjects));
      const projects = result.data.listProjects.items;
      this.setState({ projects });
    } catch (err) {
      console.log("Error listing projects:", err);
    }
  };

  handleClearModalDesc = () => {
    this.setState({
      modalDesc: "",
      valueIsFiltered: false,
      projectIsFiltered: false
    });
  };

  handleFilter = () => {
    this.setState({
      projectIsFiltered: !this.state.projectIsFiltered,
      valueIsFiltered: !this.state.valueIsFiltered
    });
  };

  handleProjectModify = async project => {
    try {
      NProgress.start();
      this.setState(
        {
          projectId: project.id,
          projectName: project.name,
          projectDescription: project.description
        },
        NProgress.done()
      );
    } catch (err) {
      console.log("There was an error updating list:", err);
    }
  };

  handleProjectDelete = async project => {
    const { id } = project;
    try {
      NProgress.start();
      const input = { id };
      const result = await API.graphql(
        graphqlOperation(deleteProject, { input })
      );
      const deletedProject = result.data.deleteProject;
      const updateProjects = this.state.projects.filter(
        value => value.id !== deletedProject.id
      );
      this.setState({ projects: updateProjects }, () => NProgress.done());
    } catch (err) {
      console.log(err);
    }
  };

  handleProjectDelete = async project => {
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

  onProjectDragEnd = result => {
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

  handleProjectSubmit = async e => {
    e.preventDefault();
    const { projectName, projectDescription, projects, projectId } = this.state;
    if (projectId !== "") {
      NProgress.start();
      const input = {
        id: projectId,
        name: projectName,
        description: projectDescription
      };
      const result = await API.graphql(
        graphqlOperation(updateProject, { input })
      );
      const updatedProject = result.data.updateProject;
      const index = projects.findIndex(
        project => project.id === this.state.projectId
      );
      const updatedProjects = [
        ...this.state.projects.slice(0, index),
        updatedProject,
        ...this.state.projects.slice(index + 1)
      ];
      this.setState(
        {
          projectName: "",
          projectDescription: "",
          projectId: "",
          projects: updatedProjects
        },
        () => NProgress.done()
      );
    } else {
      NProgress.start();
      const input = {
        name: projectName,
        description: projectDescription
      };
      const result = await API.graphql(
        graphqlOperation(createProject, { input })
      );
      const newProject = result.data.createProject;
      const updatedProjects = [newProject, ...projects];

      this.setState(
        {
          projectName: "",
          projectDescription: "",
          projects: updatedProjects
        },
        () => NProgress.done()
      );
    }
  };

  //   this.setState({
  //     projectName: "",
  //     projectDescription: "",
  //     projects: updatedProjects
  //   });
  // }
  // };

  render() {
    const {
      valueName,
      valueDescription,
      valueId,
      valueIsFiltered,
      values,
      projectName,
      projectDescription,
      projectId,
      projectIsFiltered,
      projects
    } = this.state;
    return (
      <Grommet theme={GromTheme}>
        <ResponsiveContext.Consumer>
          {size => (
            <Box>
              {this.state.valueIsFiltered && this.state.projectIsFiltered && (
                <>
                  <ModalView handleModalSubmit={this.handleModalSubmit} />
                </>
              )}
              {this.state.modalDesc ? (
                <FinalPage
                  values={this.state.values}
                  projects={this.state.projects}
                  modalDesc={this.state.modalDesc}
                  handleClearModalDesc={this.handleClearModalDesc}
                />
              ) : (
                <Box responsive={true} width="90%" alignSelf="center">
                  <Box
                    animation={
                      this.state.values.length > 2 &&
                      this.state.projects.length > 2
                        ? "pulse"
                        : false
                    }
                  >
                    <Button
                      label="Essentialize"
                      color={
                        this.state.values.length > 2 &&
                        this.state.projects.length > 2
                          ? "#00739D"
                          : "lightgrey"
                      }
                      margin="small"
                      onClick={
                        this.state.values.length > 2 &&
                        this.state.projects.length > 2
                          ? this.handleFilter
                          : () => alert("Each list must have atleast 3 items!")
                      }
                    />
                  </Box>

                  <Wrapper justify="around" direction="row" responsive={true}>
                    <ValueForm
                      name={valueName}
                      description={valueDescription}
                      id={valueId}
                      isFiltered={valueIsFiltered}
                      values={values}
                      initialLoad={this.initialValueLoad}
                      handleFilter={this.handleValueFilter}
                      handleChange={this.handleChange}
                      handleModify={this.handleValueModify}
                      handleDelete={this.handleValueDelete}
                      onDragEnd={this.onValueDragEnd}
                      handleSubmit={this.handleValueSubmit}
                    />
                    <ProjectForm
                      name={projectName}
                      description={projectDescription}
                      id={projectId}
                      isFiltered={projectIsFiltered}
                      projects={projects}
                      initialLoad={this.initialProjectLoad}
                      handleFilter={this.handleProjectFilter}
                      handleChange={this.handleChange}
                      handleModify={this.handleProjectModify}
                      handleDelete={this.handleProjectDelete}
                      onDragEnd={this.onProjectDragEnd}
                      handleSubmit={this.handleProjectSubmit}
                    />
                  </Wrapper>
                </Box>
              )}
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
    );
  }
}

const theme = {
  ...AmplifyTheme,
  a: {
    ...AmplifyTheme.a,
    color: "black",
    fontWeight: 600,
    textDecoration: "underline"
  },
  formContainer: {
    ...AmplifyTheme.formContainer,
    marginTop: "15%"
  },
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: "var(--squidInk)"
  },
  sectionBody: {
    ...AmplifyTheme.sectionBody,
    margin: "0"
  },
  formSection: {
    ...AmplifyTheme.formSection,
    borderRadius: "1%",
    padding: "25px"
  }
};

export default withAuthenticator(App, true, [], null, theme);
