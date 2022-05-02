import React from 'react';

import { Box, BoxProps, Heading, ThemingProps, useStyleConfig } from '@chakra-ui/react';
import { mergeWith } from '@chakra-ui/utils';

import { ICard } from 'src/entities/framework/card'

type ICardProps = ICard & ThemingProps & BoxProps;


const PlayingCard = (props: ICardProps) => {
    const { name, size, variant, ...boxProps } = props;

    /* Build the card style from the particular app style (styles), general card style*/
    const PlayingCardStyle = useStyleConfig('PlayingCard', { size, variant })
    const cardStyle = {
        display: 'block',
        '& > *': { textAlign: 'center' },
        position: 'relative',
        // rounded corners 
        borderRadius: '10px',
    };
    const boxStyle = mergeWith(PlayingCardStyle, cardStyle, boxProps);

    /* Card text style*/
    const textStyle = {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        textAlign: 'center',
        width: '100%',
    }

    return (
        <Box __css={boxStyle} {...boxProps}>
            <Heading sx={textStyle}>{name}</Heading>
        </Box>
    )
}

export default PlayingCard;