import Amplify from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import React from "react";
import awsmobile from "./aws-exports";
// import ProjectForm from "./components/ProjectForm/ProjectForm";
import ValueForm from "./components/ValueForm/ValueForm";

Amplify.configure(awsmobile);

class App extends React.Component {
  componentDidMount = () => {
    // try {
    //   API.graphql(graphqlOperation(listValues))
    // }
    // catch(err) {
    //   console.log('Error listing values:', err)
    // }
  };

  render() {
    return (
      <div>
        <ValueForm />
        {/* <ProjectForm /> */}
      </div>
    );
  }
}

export default withAuthenticator(App, true);
