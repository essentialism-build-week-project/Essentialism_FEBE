import React from "react";
import { Box, Card, Heading, Text } from "rebass";

export default function ValueList(props) {
  console.log(props);

  // const handleDelete = async value => {
  //   const { id } = value;
  //   try {
  //     const input = { id };
  //     const result = await API.graphql(
  //       graphqlOperation(deleteValue, { input })
  //     );
  //     const test = result.data.deleteValue;
  //     console.log("Test:", test);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div>
      {props.values.map(value => (
        <div key={value.id}>
          <Box width={256}>
            <Card
              p={1}
              borderRadius={2}
              boxShadow="0 0 16px rgba(0, 0, 0, .25)"
            >
              <Box px={2}>
                <Heading as="h3">{value.name}</Heading>
                <Text fontSize={0}>{value.description}</Text>
                <button onClick={() => props.handleDelete(value)}>
                  delete!
                </button>
                <button onClick={() => console.log("clicked")}>modify!</button>
              </Box>
            </Card>
          </Box>
        </div>
      ))}
    </div>
  );
}
