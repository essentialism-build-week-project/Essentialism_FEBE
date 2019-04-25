import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import React from 'react';
import { Flex } from 'rebass';
import awsmobile from './aws-exports';
import { Container } from './components/Global.Styles';
import ProjectForm from './components/ProjectForm/ProjectForm';
import ValueForm from './components/ValueForm/ValueForm';

Amplify.configure(awsmobile);

class App extends React.Component {
    render() {
        return (
            <Container>
                <Flex justifyContent="space-around" pt={5}>
                    <ValueForm />
                    <ProjectForm />
                </Flex>
            </Container>
        );
    }
}

export default withAuthenticator(App, true);
