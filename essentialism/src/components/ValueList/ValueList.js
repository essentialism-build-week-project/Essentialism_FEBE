import React from "react";
import { Box, Card, Heading, Text } from "rebass";
import { Button } from '../Global.Styles'

export default function ValueList(props) {
  console.log(props);

  return (
    <div>
      {props.values.map(value => (
        <div key={value.id}>
          <Box width={256}>
            <Card
              p={1}
              mb={3}
              borderRadius={2}
              boxShadow="0 0 5px rgba(0, 0, 0, .25)"
            >
              <Box px={2}>
                <Heading as="h3" pb={3}>{value.name}</Heading>
                <Text fontSize={0} pb={3  }>{value.description}</Text>
                <Button onClick={() => props.handleDelete(value)} mr={2 }>
                  delete!
                </Button>
                <Button onClick={() => props.handleModify(value)}>
                  modify!
                </Button>
              </Box>
            </Card>
          </Box>
        </div>
      ))}
    </div>
  );
}
