import { Box, Button, Heading, Paragraph } from "grommet";
import { Edit, Trash } from "grommet-icons";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import { Box, Card, Flex, Heading, Text } from "rebass";
// import { Button } from "../Global.Styles";

export default function ValueList(props) {
  const values = props.isFiltered
    ? props.values.filter((value, index) => index < 3)
    : props.values;

  return (
    <div>
      <DragDropContext onDragEnd={props.onDragEnd}>
        <Box margin={{ bottom: "xlarge" }}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {values.map((value, index) => (
                  <Draggable
                    key={value.id}
                    draggableId={value.id}
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
                              {value.name}
                            </Heading>
                            <Paragraph margin="small">
                              {value.description}
                            </Paragraph>
                            <Box direction="row">
                              <Button
                                label="Edit"
                                icon={<Edit color="brand" />}
                                onClick={() => props.handleModify(value)}
                                margin="small"
                              />
                              <Button
                                label="Delete"
                                icon={<Trash color="brand" />}
                                onClick={() => props.handleDelete(value)}
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
