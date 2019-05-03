import { Box, Button, Form, FormField } from 'grommet';
import { AddCircle, Edit } from 'grommet-icons';
import React, { Component } from 'react';
// import { Box } from "rebass";
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
                            <Button
                                label={
                                    this.props.id === ''
                                        ? 'Value'
                                        : 'Modify Value'
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
