import { Anchor, Box, Text } from 'grommet';
import React from 'react';
import { WrapperRow, WrapperColumn } from '../Global.Styles';

export default function Footer() {
    return (
        <Box pad="large" background='dark-2'>
            <Box margin={{ bottom: 'large'}}>
                <WrapperRow>
        
                <Anchor 
                href="#" 
                primary label="| Facebook |"
                />
                <Anchor 
                href="#" 
                primary label="| Twitter |"
                />
                <Anchor 
                href="#" 
                primary label="| Instagram |"
                />
                </WrapperRow>
            </Box>
            <WrapperColumn>

            <Text>COPYRIGHT © 2019 ESSENTIALIZE. ALL RIGHTS RESERVED.</Text>
            </WrapperColumn>
        </Box>
    );
}
