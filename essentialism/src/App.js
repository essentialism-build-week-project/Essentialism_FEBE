import React from 'react';
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

Amplify.configure(awsmobile);


function App() {
  return (
    <div>Hello World</div>
  );
}

export default withAuthenticator(App, true);
