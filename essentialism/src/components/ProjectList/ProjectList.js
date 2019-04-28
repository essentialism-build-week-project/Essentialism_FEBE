import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Box, Card, Flex, Heading, Text } from 'rebass';
import { Button } from '../Global.Styles';

export default function ProjectList(props) {
    const projects = props.isFiltered
        ? props.projects.filter((value, index) => index < 3)
        : props.projects;

    return (
        <div>
            <DragDropContext onDragEnd={props.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {projects.map((project, index) => (
                                <Draggable
                                    key={project.id}
                                    draggableId={project.id}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <Box width={256}>
                                                <Card
                                                    p={1}
                                                    mb={3}
                                                    borderRadius={2}
                                                    boxShadow="0 0 5px rgba(0, 0, 0, .25)"
                                                >
                                                    <Box px={2}>
                                                        <Heading as="h3" pb={3}>
                                                            {project.name}
                                                        </Heading>
                                                        <Text
                                                            fontSize={0}
                                                            pb={3}
                                                        >
                                                            {
                                                                project.description
                                                            }
                                                        </Text>
                                                        <Flex>
                                                            <Box mr={3}>
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faTrashAlt
                                                                    }
                                                                    onClick={() =>
                                                                        props.handleDelete(
                                                                            project
                                                                        )
                                                                    }
                                                                    mr={2}
                                                                />
                                                            </Box>
                                                            <Box>
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faEdit
                                                                    }
                                                                    onClick={() =>
                                                                        props.handleModify(
                                                                            project
                                                                        )
                                                                    }
                                                                />
                                                            </Box>
                                                        </Flex>
                                                    </Box>
                                                </Card>
                                            </Box>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            {props.projects.length > 3 && !props.isFiltered ? (
                <Button onClick={props.handleFilter}>Essentialize</Button>
            ) : props.projects.length > 3 && props.isFiltered ? (
                <Button onClick={props.handleFilter}>Un-Essentialize</Button>
            ) : null}
        </div>
    );
}
