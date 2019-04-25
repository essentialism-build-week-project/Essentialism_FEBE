import React from "react";
import { Box, Card, Heading, Text } from "rebass";
import { Button } from '../Global.Styles'

export default function ProjectList(props) {
  return (
    <div>
      {props.projects.map(project => (
        <div key={project.id}>
          <Box width={256}>
            <Card
              p={1}
              mb={3}
              borderRadius={2}
              boxShadow="0 0 5px rgba(0, 0, 0, .25)"
            >
              <Box px={2}>
                <Heading as="h3" pb={3}>{project.name}</Heading>
                <Text fontSize={0} pb={3}>{project.description}</Text>
                <Button onClick={() => props.handleDelete(project)} mr={2}>
                  Delete
                </Button>
                <Button onClick={() => props.handleModify(project)}>
                  Modify
                </Button>
              </Box>
            </Card>
          </Box>
        </div>
      ))}
    </div>
  );
}
