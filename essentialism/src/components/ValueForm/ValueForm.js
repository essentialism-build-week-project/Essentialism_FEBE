import { Box, Button, Form, FormField, Stack, Text } from 'grommet';
import { AddCircle, Edit } from 'grommet-icons';
import React, { Component } from 'react';
import ValueList from '../ValueList/ValueList';

export default class ValueForm extends Component {
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
                                name="valueName"
                                placeholder="Name of value"
                                value={this.props.name}
                                onChange={this.props.handleChange}
                                color="#00739D"
                            />
                        </label>
                        <label>
                            <FormField
                                name="valueDescription"
                                placeholder="Description for value"
                                value={this.props.description}
                                onChange={this.props.handleChange}
                            />
                        </label>
                        <Box>
                            <Stack anchor="top">
                                <Button
                                    label={
                                        this.props.id === ''
                                            ? 'Value'
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
                                {this.props.values.length < 3 ? (
                                    <Box
                                        round
                                        background="status-disabled"
                                        pad={{ horizontal: 'xsmall' }}
                                    >
                                        <Text>{this.props.values.length}</Text>
                                    </Box>
                                ) : (
                                    <Box
                                        round
                                        background="accent-1"
                                        pad={{ horizontal: 'xsmall' }}
                                    >
                                        <Text>{this.props.values.length}</Text>
                                    </Box>
                                )}
                            </Stack>
                        </Box>
                    </Form>
                </Box>
                <ValueList
                    handleFilter={this.props.handleFilter}
                    onDragEnd={this.props.onDragEnd}
                    handleModify={this.props.handleModify}
                    handleDelete={this.props.handleDelete}
                    values={this.props.values}
                    modify={this.props.id === ''}
                    isFiltered={this.props.isFiltered}
                />
            </div>
        );
    }
}
