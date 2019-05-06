import { Box, Button, Heading, Paragraph } from "grommet";
import { Edit, Trash } from "grommet-icons";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import { Button } from "../Global.Styles";

export default function ProjectList(props) {
  const projects = props.isFiltered
    ? props.projects.filter((value, index) => index < 3)
    : props.projects;

  return (
    <div>
      <DragDropContext onDragEnd={props.onDragEnd}>
        <Box margin={{ bottom: "xlarge" }}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
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
                        <div>
                          <Box
                            size="1/2"
                            direction="column"
                            border={{
                              color: "border",
                              size: "xsmall"
                            }}
                            pad="medium"
                            margin="small"
                            animation="zoomIn"
                            background="#ffffff"
                          >
                            <Heading margin="xsmall" level="3" color="brand">
                              {project.name}
                            </Heading>
                            <Paragraph margin="small">
                              {project.description}
                            </Paragraph>
                            <Box direction="row">
                              <Button
                                label="Edit"
                                icon={<Edit color="brand" />}
                                onClick={() => props.handleModify(project)}
                                margin="small"
                              />
                              <Button
                                label="Delete"
                                icon={<Trash color="brand" />}
                                onClick={() => props.handleDelete(project)}
                                margin="small"
                              />
                            </Box>
                          </Box>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Box>
      </DragDropContext>
    </div>
  );
}
