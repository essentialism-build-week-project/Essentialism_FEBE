import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

class Billing extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_2Eqpw375ZOacCHMdy7bEbjrs00rwSm0DYZ">
        <div className="example">
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default Billing;
