import { Anchor, Box, Paragraph, Text } from 'grommet';
import React from 'react';
import { WrapperColumn, WrapperRow } from '../Global.Styles';

export default function Footer() {
    return (
        <Box pad="large" background="dark-2">
            <WrapperColumn>
                <Box margin="medium">
                    <Paragraph>Follow us on</Paragraph>
                </Box>
            </WrapperColumn>
            <Box margin={{ bottom: 'large' }}>
                <WrapperRow>
                    <Anchor href="#" primary label="| Facebook |" />
                    <Anchor href="#" primary label="| Twitter |" />
                    <Anchor href="#" primary label="| Instagram |" />
                </WrapperRow>
            </Box>
            <WrapperColumn>
                <Text size='small' textAlign='center'>COPYRIGHT © 2019 ESSENTIALIZE. ALL RIGHTS RESERVED.</Text>
            </WrapperColumn>
        </Box>
    );
}
