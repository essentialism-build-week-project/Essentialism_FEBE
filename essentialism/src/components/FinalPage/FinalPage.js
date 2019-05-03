import { Box, Button, Heading, Paragraph } from "grommet";
import React from "react";
import { Flex } from "rebass";
// import { Button } from "../Global.Styles";
import StripeButton from "../StripeButton/StripeButton";

export default function FinalPage(props) {
  return (
    <Box size="large">
      <Flex justifyContent="center">
        <h2>Achieve more by doing less</h2>
      </Flex>

      <Flex justifyContent="center" pt={5}>
        <div>
          <h3>Your top 3 values</h3>

          {props.values.map((value, index) =>
            index < 3 ? (
              <div key={value.id}>
                <Box
                  animation={["fadeIn", "slideUp"]}
                  direction="column"
                  border={{ color: "#00739D", size: "small" }}
                  pad="small"
                  margin="small"
                >
                  <Heading margin="xsmall" level="3">
                    {value.name}
                  </Heading>
                  <Paragraph margin="small">{value.description}</Paragraph>
                </Box>
              </div>
            ) : null
          )}
        </div>
        <div>
          <h3>Your top 3 projects</h3>
          {props.projects.map((project, index) =>
            index < 3 ? (
              <div key={project.id}>
                <Box
                  animation={["fadeIn", "slideUp"]}
                  direction="column"
                  border={{ color: "#00739D", size: "small" }}
                  pad="small"
                  margin="small"
                >
                  <Heading margin="xsmall" level="3">
                    {project.name}
                  </Heading>
                  <Paragraph margin="small">{project.description}</Paragraph>
                </Box>
              </div>
            ) : null
          )}
        </div>
      </Flex>
      <Flex alignItems="center" flexDirection="column">
        <h2>{props.modalDesc}</h2>
        <Button
          label="Back"
          color="#00739D"
          onClick={props.handleClearModalDesc}
        />
        <StripeButton />
        {/* <Confetti
          style={{ pointerEvents: "none" }}
          numberOfPieces={1500}
          gravity={0.25}
          recycle={false}
        /> */}
      </Flex>
    </Box>
  );
}
