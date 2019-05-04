import { API } from 'aws-amplify';
import { Text } from 'grommet';
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const stripeConfig = {
    currency: 'USD',
    PUB_KEY: 'pk_test_r7F5D6WDUTqIc0XLdf60UPt900ELuVpqII'
};

const handleCharge = async token => {
    try {
        const result = await API.post('orderLambda', '/charge', {
            body: {
                token,
                charge: {
                    currency: stripeConfig.currency,
                    amount: 100,
                    description: 'Support Development of Essentialize'
                }
            }
        });
    } catch (err) {
        console.log('There was an error charging credit card:', err);
    }
};

export default function StripeButton() {
    return (
        <>
            <Text weight="bold" size="large" margin={{ bottom: 'large' }}>
                Support our work.
            </Text>
            <StripeCheckout
                token={handleCharge}
                currency={stripeConfig.currency}
                stripeKey={stripeConfig.PUB_KEY}
            />
        </>
    );
}
