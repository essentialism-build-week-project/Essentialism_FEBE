<<<<<<< HEAD
import {
  Box,
  Button,
  Heading,
  Paragraph,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text
} from "grommet";
import React from "react";
import Confetti from "react-confetti";
import { WrapperColumn, WrapperRow } from "../Global.Styles";
import StripeButton from "../StripeButton/StripeButton";

export default function FinalPage(props) {
  return (
    <Box background="light-1" pad="xlarge">
      <WrapperColumn>
        <Text
          color="brand"
          size="xlarge"
          weight="bold"
          margin={{ bottom: "large" }}
        >
          Achieve more by doing less!
        </Text>
        <Text size="large" weight="bold">
          Congratulations!!!
        </Text>
        {props.values.length > 3 || props.projects.length > 3 ? (
          <>
            <Paragraph margin={{ bottom: "large" }}>
              You have successfully decreased the number of things you are
              focused upon by:
            </Paragraph>
            <Box animation="fadeIn">
              <Heading color="accent-1">
                {Math.round(
                  100 -
                    (6 / (props.values.length + props.projects.length)) * 100
=======
import { Box, Button, Heading, Paragraph, Table, TableBody, TableCell, TableHeader, TableRow, Text } from 'grommet';
import React from 'react';
import Confetti from 'react-confetti';
import { WrapperColumn, WrapperRow } from '../Global.Styles';
import StripeButton from '../StripeButton/StripeButton';

export default function FinalPage(props) {

    const firstThreeValues = props.values.map( (value, index) => {
        return index <=2 ? value : null
    }).filter( item => item !== null)

    const firstThreeProjects = props.projects.map( (project, index) => {
        return index <=2 ? project : null
    }).filter( item => item !== null)


    return (
        <Box background="light-1" pad="large">
            <WrapperColumn>
                <Heading
                    color="brand"
                    size="small"
                    weight="bold"
                    textAlign='center'
                >
                    Achieve more by doing less!
                </Heading>
               
                {props.values.length > 3 || props.projects.length > 3 ? (
                    <>
                        <Paragraph textAlign='center'>
                            You have successfully decreased the number of things
                            you are focused upon by:
                        </Paragraph>
                        <Box animation="fadeIn">
                            <Heading color="accent-1">
                                {Math.round(
                                    100 -
                                        (6 /
                                            (props.values.length +
                                                props.projects.length)) *
                                            100
                                )}
                                %
                            </Heading>
                        </Box>
                        <Box margin={{ bottom: 'medium'}}>
                        <Paragraph textAlign='center'>
                            Now you can use this cognitive energy surplus to
                            focus upon this things that matter most.
                        </Paragraph>

                        </Box>
                    </>
                ) : (
                        <Box margin={{ bottom: 'medium' }}>
                    <Paragraph textAlign='center'>
                        Now that you are aware of what's most important to
                        you... continue to stay focused!
                    </Paragraph>
                    </Box>
>>>>>>> 0eef0cc36a32fca3bd413ed03fe8624b2eae4958
                )}
                %
              </Heading>
            </Box>
            <Paragraph>
              Now you can use this cognitive energy surplus to focus upon this
              things that matter most.
            </Paragraph>
          </>
        ) : (
          <Paragraph>
            Now that you are aware of what's most important to you... continue
            to stay focused!
          </Paragraph>
        )}

<<<<<<< HEAD
        <WrapperRow>
          <div>
            <WrapperColumn>
              <Text weight="bold" size="xlarge" margin="medium">
                Your top 3 values
              </Text>
            </WrapperColumn>
            <WrapperRow>
              <Box margin="medium">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableCell scope="col" border="bottom">
                        Rank
                      </TableCell>
                      <TableCell scope="col" border="bottom">
                        Name
                      </TableCell>
                      <TableCell scope="col" border="bottom">
                        Description
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {props.values.map((value, index) => {
                      return (
                        <TableRow key={value.id}>
                          <TableCell scope="row">
                            <strong>{index + 1}</strong>
                          </TableCell>
                          <TableCell scope="row">
                            <strong>{value.name}</strong>
                          </TableCell>
                          <TableCell>{value.description}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
            </WrapperRow>
          </div>
          <div>
            <WrapperColumn>
              <Text weight="bold" size="xlarge" margin="medium">
                Your top 3 projects
              </Text>
=======
                <WrapperRow>
                    <div>
                        <WrapperColumn>
                            <Text weight="bold" size="xlarge" margin="medium">
                                Your top 3 values
                            </Text>
                        </WrapperColumn>
                        <WrapperRow>
                            <Box margin="medium">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableCell
                                                scope="col"
                                                border="bottom"
                                            >
                                                Rank
                                            </TableCell>
                                            <TableCell
                                                scope="col"
                                                border="bottom"
                                            >
                                                Name
                                            </TableCell>
                                            <TableCell
                                                scope="col"
                                                border="bottom"
                                            >
                                                Description
                                            </TableCell>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {firstThreeValues.map((value, index) => {
                                            return (
                                                <TableRow key={value.id}>
                                                    <TableCell scope="row">
                                                        <strong>
                                                            {index + 1}
                                                        </strong>
                                                    </TableCell>
                                                    <TableCell scope="row">
                                                        <strong>
                                                            {value.name}
                                                        </strong>
                                                    </TableCell>
                                                    <TableCell>
                                                        {value.description}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </Box>
                        </WrapperRow>
                    </div>
                    <div>
                        <WrapperColumn>
                            <Text weight="bold" size="xlarge" margin="medium">
                                Your top 3 projects
                            </Text>
                        </WrapperColumn>
                        <WrapperRow>
                            <Box margin="medium">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableCell
                                                scope="col"
                                                border="bottom"
                                            >
                                                Rank
                                            </TableCell>
                                            <TableCell
                                                scope="col"
                                                border="bottom"
                                            >
                                                Name
                                            </TableCell>
                                            <TableCell
                                                scope="col"
                                                border="bottom"
                                            >
                                                Description
                                            </TableCell>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {firstThreeProjects.map((project, index) => {
                                            return (
                                                <TableRow key={project.id}>
                                                    <TableCell scope="row">
                                                        <strong>
                                                            {index + 1}
                                                        </strong>
                                                    </TableCell>
                                                    <TableCell scope="row">
                                                        <strong>
                                                            {project.name}
                                                        </strong>
                                                    </TableCell>
                                                    <TableCell>
                                                        {project.description}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </Box>
                        </WrapperRow>
                    </div>
                </WrapperRow>
                <WrapperColumn>
                    <Text weight="bold" size="xlarge" margin="medium">
                        The reasons why:
                    </Text>
                    <Text textAlign='center'>{props.modalDesc}</Text>
                </WrapperColumn>
                <Button
                    primary label="Back"
                    color="brand"
                    margin="medium"
                    onClick={props.handleClearModalDesc}
                />
                <StripeButton />
                <Confetti
                    style={{ pointerEvents: 'none' }}
                    numberOfPieces={1500}
                    gravity={0.25}
                    recycle={false}
                />
>>>>>>> 0eef0cc36a32fca3bd413ed03fe8624b2eae4958
            </WrapperColumn>
            <WrapperRow>
              <Box margin="medium">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableCell scope="col" border="bottom">
                        Rank
                      </TableCell>
                      <TableCell scope="col" border="bottom">
                        Name
                      </TableCell>
                      <TableCell scope="col" border="bottom">
                        Description
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {props.values.map((project, index) => {
                      return (
                        <TableRow key={project.id}>
                          <TableCell scope="row">
                            <strong>{index + 1}</strong>
                          </TableCell>
                          <TableCell scope="row">
                            <strong>{project.name}</strong>
                          </TableCell>
                          <TableCell>{project.description}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
            </WrapperRow>
          </div>
        </WrapperRow>
        <WrapperColumn>
          <Text weight="bold" size="xlarge" margin="medium">
            The reasons why:
          </Text>
          <Text textAlign="center">{props.modalDesc}</Text>
        </WrapperColumn>
        <Button
          primary
          label="Back"
          color="brand"
          margin="medium"
          onClick={props.handleClearModalDesc}
        />
        <StripeButton />
        <Confetti
          style={{ pointerEvents: "none" }}
          numberOfPieces={1500}
          gravity={0.25}
          recycle={false}
        />
      </WrapperColumn>
    </Box>
  );
}
