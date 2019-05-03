import { Box, Button, Heading, Paragraph } from 'grommet';
import React from 'react';
import Confetti from 'react-confetti';
import { Container, WrapperRow } from '../Global.Styles';
import StripeButton from '../StripeButton/StripeButton';

export default function FinalPage(props) {
    return (
      <Box size="large">
          <Container>
                <Heading justifyContent="center">
                    Achieve more by doing less
                </Heading>
                <WrapperRow>
                  <div>
                    <h3>Your top 3 values</h3>
                    {props.values.map((value, index) =>
                        index < 3 ? (
                            <div key={value.id}>
                                <Box
                                    direction="column"
                                    border={{ color: 'border', size: 'xsmall' }}
                                    pad="small"
                                    margin="small"
                                >
                                    <Heading margin="xsmall" level="3">
                                        {value.name}
                                    </Heading>
                                    <Paragraph margin="small">
                                        {value.description}
                                    </Paragraph>
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
                                    direction="column"
                                    border={{ color: 'border', size: 'xsmall' }}
                                    pad="small"
                                    margin="small"
                                >
                                    <Heading margin="xsmall" level="3">
                                        {project.name}
                                    </Heading>
                                    <Paragraph margin="small">
                                        {project.description}
                                    </Paragraph>
                                </Box>
                            </div>
                        ) : null
                    )}
                </div>
          </WrapperRow>

                <h2>{props.modalDesc}</h2>
                <Button
                    label="Back"
                    color="brand"
                    onClick={props.handleClearModalDesc}
                />
                <StripeButton />
                <Confetti
                    style={{ pointerEvents: 'none' }}
                    numberOfPieces={1500}
                    gravity={0.25}
                    recycle={false}
                />
        </Container>
            </Box>
    );
}
