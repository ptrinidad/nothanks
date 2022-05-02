import React from 'react';

import { observer } from 'mobx-react';
import { Box, Button, HStack, Spacer, Heading, VStack, Text, FlexProps } from '@chakra-ui/react';

import gameState from 'pages/store';

import NoThanksCard from 'src/components/PlayingCard';
import Chips from 'src/components/Chips';
import { chipType } from 'src/entities/nothanks/common';

type IPanelProps = {
} & FlexProps;

export default observer(class PlayerPanel extends React.Component<IPanelProps, {}> {
    public constructor(props: IPanelProps) {
        super(props);
    }

    public render() {
        const currentPlayer = gameState.players[gameState.whoisturn];
        const cards = currentPlayer._cards;
        const chips = currentPlayer._pool.getResources(chipType) || 0;
        const action = gameState.availableActions;
        const score = currentPlayer.score;

        const actionButtonStyle = {
            bg: 'brand.500',
            _hover: {
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
            }
        }

        return (
            <Box {...this.props} p="1em" bgColor={currentPlayer.color}>
                <VStack>
                    <Heading>{currentPlayer.name}</Heading>
                    <Text>Score: {score}</Text>
                    <HStack p="1em" spacing="0">
                        {cards.cards.map((c,i,array) => (
                            <>
                             {(i > 0 && (c.value + 1) !== array[i-1].value) ? <Spacer w="1em"/> : null}
                             {(i == 0 || (c.value + 1) !== array[i-1].value) ? <NoThanksCard key={c._uid} {...c}/> : <NoThanksCard key={c._uid} {...c} color="gray.500" />}

                            </>
                        ))}
                    </HStack>
                    <Box><Chips chips={chips} /></Box>
                    <Box>
                        {action.map((action) => (<Button key={action.actionName} sx={actionButtonStyle} m="1em"  onClick={() => action.execute(gameState)}>{action.actionName}</Button>))}
                    </Box>
                </VStack>
            </Box>


        );
    }
})


