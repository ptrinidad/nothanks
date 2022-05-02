import * as React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

type IChipsProps = {
    chips: number;
} & BoxProps;

// Poker-like chips
const Chips = (props: IChipsProps) => {
    const chipStyle = {
        borderRadius: '50%',
        w: '2.5em',
        lineHeight: '2.5em',
        textAlign: 'center',
        color: 'white',
        border: '2px dashed white',
        bgColor: 'red',
    };

    const {chips, ...boxProps} = props;
    
    return (
        <Box {...boxProps} sx={chipStyle}>
            {chips}
        </Box>
    );
}

export default Chips;