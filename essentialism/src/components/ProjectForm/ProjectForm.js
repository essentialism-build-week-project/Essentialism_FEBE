import { Box, Button, Form, FormField, Stack, Text } from 'grommet';
import { AddCircle, Edit } from 'grommet-icons';
import React, { Component } from 'react';

export default class ProjectForm extends Component {
    componentDidMount = async () => {
        this.props.initialLoad();
    };

    render() {
        return (
            <div>
                <Box margin="large">
                    <Form onSubmit={this.props.handleSubmit}>
                        <label>
                            <FormField
                                name="projectName"
                                placeholder="Name of project"
                                value={this.props.name}
                                onChange={this.props.handleChange}
                                color="#6495ED"
                                required={true}
                            />
                        </label>
                        <label>
                            <FormField
                                name="projectDescription"
                                placeholder="Description of project"
                                value={this.props.description}
                                onChange={this.props.handleChange}
                                color="#00739D"
                                required={true}
                            />
                        </label>

                        <Box pad={{ bottom: 'medium' }}>
                            <Stack anchor="top-right" guidingChild="first">
                                <Box>
                                    <Button
                                        label={
                                            this.props.id === ''
                                                ? 'Project'
                                                : 'Modify Project'
                                        }
                                        icon={
                                            this.props.id === '' ? (
                                                <AddCircle color="brand" />
                                            ) : (
                                                <Edit color="brand" />
                                            )
                                        }
                                        type="submit"
                                        margin="small"
                                    />
                                </Box>
                                {this.props.projects.length < 3 &&
                                !this.props.isModify ? (
                                    <Box
                                        round
                                        background="status-disabled"
                                        pad={{ horizontal: 'xsmall' }}
                                    >
                                        <Text>
                                            {this.props.projects.length}
                                        </Text>
                                    </Box>
                                ) : this.props.projects.length >= 3 &&
                                  !this.props.isModify ? (
                                    <Box
                                        round
                                        background="accent-1"
                                        pad={{ horizontal: 'xsmall' }}
                                    >
                                        <Text>
                                            {this.props.projects.length}
                                        </Text>
                                    </Box>
                                ) : null}
                            </Stack>
                        </Box>
                    </Form>
                </Box>
            </div> 
        );
    }
}
