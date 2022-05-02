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
            <VStack>
                {(gameState.status === "open") ?
                    <>
                        <Heading>Waiting for players</Heading>
                    </> : null}
                {(gameState.status === "playing") ?
                    <>
                        <Heading>{currentPlayer.name}</Heading>
                        <Text>Score: {currentPlayer.score}</Text>
                    </> : null}
                {(gameState.status === "finished") ?
                    <>
                        <Heading>Game finished</Heading>
                        <Text>Winner: {gameState.currentWinners.map((player, i) => ( ((i > 0) ? ", " + player.name: player.name) ))}</Text>
                    </> : null}
            </VStack>
        );
    }
})
