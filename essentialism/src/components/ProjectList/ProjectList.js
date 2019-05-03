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
                          animation={["fadeIn", "slideDown"]}
                          size="1/2"
                          direction="column"
                          border={{ color: "#00739D", size: "small" }}
                          pad="small"
                          margin="small"
                        >
                          <Heading margin="xsmall" level="3">
                            {project.name}
                          </Heading>
                          <Paragraph margin="small">
                            {project.description}
                          </Paragraph>
                          <Box direction="row">
                            <Button
                              label="Edit"
                              icon={<Edit />}
                              onClick={() => props.handleModify(project)}
                              color="#00739D"
                              margin="small"
                            />
                            <Button
                              label="Delete"
                              icon={<Trash />}
                              onClick={() => props.handleDelete(project)}
                              color="#00739D"
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
      </DragDropContext>
    </div>
  );
}
