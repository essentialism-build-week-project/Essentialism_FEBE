import React from "react";
// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from "react-confetti";
import { Box, Card, Flex, Heading, Text } from "rebass";
import { Button } from "../Global.Styles";

export default function FinalPage(props) {
  return (
    <>
      <Flex justifyContent="center">
        <h2>Do more by doing less</h2>
      </Flex>

      <Flex justifyContent="space-around" pt={5}>
        <div>
          <h3>Your top 3 values</h3>

          {props.values.map((value, index) =>
            index < 3 ? (
              <>
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
                    </Box>
                  </Card>
                </Box>
              </>
            ) : null
          )}
        </div>
        <div>
          <h3>Your top 3 projects</h3>
          {props.projects.map((project, index) =>
            index < 3 ? (
              <>
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
                    </Box>
                  </Card>
                </Box>
              </>
            ) : null
          )}
        </div>
      </Flex>
      <Flex alignItems="center" flexDirection="column">
        <h2>{props.modalDesc}</h2>
        <Button onClick={props.handleClearModalDesc}>Back</Button>
      </Flex>
      <Confetti
        style={{ pointerEvents: "none" }}
        numberOfPieces={1500}
        gravity={0.25}
        recycle={false}
      />
    </>
  );
}
