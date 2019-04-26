import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Box, Card, Heading, Text } from "rebass";
import { Button } from "../Global.Styles";

export default function ValueList(props) {
  console.log(props);

  const values = props.isFiltered
    ? props.values.filter((value, index) => index < 3)
    : props.values;

  return (
    <div>
      <DragDropContext onDragEnd={props.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {values.map((value, index) => (
                <Draggable key={value.id} draggableId={value.id} index={index}>
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
                              {value.name}
                            </Heading>
                            <Text fontSize={0} pb={3}>
                              {value.description}
                            </Text>
                            <Button
                              onClick={() => props.handleDelete(value)}
                              mr={2}
                            >
                              delete!
                            </Button>
                            <Button onClick={() => props.handleModify(value)}>
                              modify!
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
      {props.values.length > 2 ? (
        <Button onClick={props.handleFilter}>Complete</Button>
      ) : (
        <Button disabled>Complete</Button>
      )}
    </div>
  );
}
