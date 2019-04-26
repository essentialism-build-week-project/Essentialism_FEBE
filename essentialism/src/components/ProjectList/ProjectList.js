import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Box, Card, Heading, Text } from "rebass";
import { Button } from "../Global.Styles";

export default function ProjectList(props) {
  return (
    <div>
      <DragDropContext onDragEnd={props.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {props.projects.map((project, index) => (
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
                            <Text fontSize={0} pb={3}>
                              {project.description}
                            </Text>
                            <Button
                              onClick={() => props.handleDelete(project)}
                              mr={2}
                            >
                              Delete
                            </Button>
                            <Button onClick={() => props.handleModify(project)}>
                              Modify
                            </Button>
                          </Box>
                        </Card>
                      </Box>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
