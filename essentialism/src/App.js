import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import React from 'react';
import awsmobile from './aws-exports';
import { createValue } from './graphql/mutations';

Amplify.configure(awsmobile);

class App extends React.Component {
    state = {
        name: '',
        description: '',
        values: []
    };

    componentDidMount = () => {
        // try {
        //   API.graphql(graphqlOperation(listValues))
        // }
        // catch(err) {
        //   console.log('Error listing values:', err)
        // }
    };

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async e => {
        const { name, description, values } = this.state;
        e.preventDefault();
        const input = { name, description };
        const result = await API.graphql(
            graphqlOperation(createValue, { input })
        );
        const newValue = result.data.createValue;
        const updatedValues = [newValue, ...values];

        this.setState({ name: '', desc: '', values: updatedValues });
    };

    render() {
        return (
            <div>
                <h1>What do you value most?</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Enter your value
                        <input
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            placeholder="Name"
                        />
                    </label>
                    <label>
                        Describe your value
                        <input
                            type="text"
                            name="description"
                            value={this.state.description}
                            onChange={this.handleChange}
                            placeholder="Enter a description for your value"
                        />
                    </label>
                    <button type="submit">Add Value</button>
                </form>
                <div>
                    {this.state.values.map(value => (
                        <div key={value.id}>
                            <h3>{value.name}</h3>
                            <p>{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default withAuthenticator(App, true);
