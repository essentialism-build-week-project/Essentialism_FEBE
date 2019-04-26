import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import React from 'react';
import { Flex } from 'rebass';
import awsmobile from './aws-exports';
import { Container } from './components/Global.Styles';
import ProjectForm from './components/ProjectForm/ProjectForm';
import ValueForm from './components/ValueForm/ValueForm';
import ModalView from './components/Modal/Modal';

Amplify.configure(awsmobile);

class App extends React.Component {
    render() {
        return (
            <Container>
                <Flex justifyContent="space-around" pt={5}>
                    <ValueForm />
                    <ProjectForm />
                    <ModalView />
                </Flex>
            </Container>
        );
    }
}

export default withAuthenticator(App, true);
