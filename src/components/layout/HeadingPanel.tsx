import React from 'react';

import { observer } from 'mobx-react';
import { Badge, Box, Button, FlexProps, Heading, Spacer, Text, VStack } from '@chakra-ui/react';

import gameState from 'pages/store';

type IHeadingProps = {
} & FlexProps;

export default observer(class HeadingPanel extends React.Component<IHeadingProps, {}> {
    public constructor(props: IHeadingProps) {
        super(props);
    }

    public render() {
        const currentPlayer = gameState.currentPlayer;

        return (
        <VStack bgColor={currentPlayer.color}>
            <Heading>{currentPlayer.name}</Heading>
            <Text>Score: {currentPlayer.score}</Text>
        </VStack>
        );
    }
})
