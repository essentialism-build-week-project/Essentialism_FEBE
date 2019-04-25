import React from "react";
import { Box, Card, Heading, Text } from "rebass";
export default function ProjectList(props) {
  return (
    <div>
      {props.projects.map(project => (
        <div key={project.id}>
          <Box width={256}>
            <Card
              p={1}
              borderRadius={2}
              boxShadow="0 0 16px rgba(0, 0, 0, .25)"
            >
              <Box px={2}>
                <Heading as="h3">{project.name}</Heading>
                <Text fontSize={0}>{project.description}</Text>
                <button onClick={() => props.handleDelete(project)}>
                  delete!
                </button>
                <button onClick={() => props.handleModify(project)}>
                  modify!
                </button>
              </Box>
            </Card>
          </Box>
        </div>
      ))}
    </div>
  );
}
