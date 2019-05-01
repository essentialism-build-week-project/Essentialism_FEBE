import {
  Box as GromBox,
  Button as GromButton,
  Heading as GromHeading,
  Paragraph
} from "grommet";
import { Edit, Trash } from "grommet-icons";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import { Box, Card, Flex, Heading, Text } from "rebass";
import { Button } from "../Global.Styles";

export default function ValueList(props) {
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
                      <div>
                        <GromBox
                          direction="column"
                          border={{ color: "#00739D", size: "small" }}
                          pad="small"
                          margin="small"
                          responsive="true"
                        >
                          <GromHeading margin="xsmall" level="3">
                            {value.name}
                          </GromHeading>
                          <Paragraph margin="small">
                            {value.description}
                          </Paragraph>
                          <GromBox direction="row">
                            <GromButton
                              label="test"
                              icon={<Edit />}
                              onClick={() => props.handleModify(value)}
                              color="#00739D"
                            />
                            <GromButton
                              label="test 1"
                              icon={<Trash />}
                              onClick={() => props.handleDelete(value)}
                              color="#00739D"
                            />
                          </GromBox>
                        </GromBox>
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
      {props.values.length > 3 && !props.isFiltered ? (
        <Button onClick={props.handleFilter}>Essentialize</Button>
      ) : props.values.length > 3 && props.isFiltered ? (
        <Button onClick={props.handleFilter}>Un-Essentialize</Button>
      ) : null}
    </div>
  );
}
