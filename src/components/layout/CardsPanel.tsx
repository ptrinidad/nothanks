import React from 'react';

import { observer } from 'mobx-react';
import { Badge, Box, Button, Center, FlexProps, HStack, Spacer } from '@chakra-ui/react';

import gameState from 'pages/store';

import NoThanksCard from 'src/components/PlayingCard';
import PlayingCard from 'src/components/PlayingCard';

type ICardsPanelProps = {
} & FlexProps;

export default observer(class CardsPanel extends React.Component<ICardsPanelProps, {}> {
    public constructor(props: ICardsPanelProps) {
        super(props);
    }

    public render() {
        const currentPlayer = gameState.players[gameState.whoisturn];
        const cards = currentPlayer._cards;
        const actions = gameState.availableActions;
        const deckSize = gameState.deck.size;
        const card = gameState.deck.head;

        const deckWidth = '70px';
        const deckStyle = {
            borderBottom: '5px double',
            borderRight: '5px double',
            width: deckWidth,
        }
        const badgeStyle = {
            borderRadius: '50%',
            w: '2.5em',
            lineHeight: '2.5em',
            textAlign: 'center',
            position: 'absolute',
            bottom: '-1.25em',
            backgroundColor: '#fff',
            rigth: '-1.25em',
        }

        const actionButtonStyle = {
            bg: 'brand.500',
            _hover: {
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
            }
        }

        const action = actions.find((action) => action.actionName === 'Get card');

        return (
            <Box {...this.props} p="1em">
                <Center>
                <HStack>
                    <Box m="1em" position="relative" w={deckWidth}>
                        <NoThanksCard sx={deckStyle} {...card} />
                        <Badge variant="outline" colorScheme="brand" sx={badgeStyle}>{deckSize}</Badge>
                    </Box>
                    <Center w='10em'>
                        {action ? <Button key={action.actionName} sx={actionButtonStyle} m="1em"  onClick={() => action.execute(gameState)}>{action.actionName}</Button> : null}
                    </Center>

                    <HStack p="1em" spacing="0">
                        {cards.hasCards ? cards.cards.map((c,i,array) => (
                            <>
                             {(i > 0 && (c.value + 1) !== array[i-1].value) ? <Spacer w="1em"/> : null}
                             {(i == 0 || (c.value + 1) !== array[i-1].value) ? <NoThanksCard key={c._uid} {...c}/> : <NoThanksCard key={c._uid} {...c} color="gray.500" />}

                            </>
                        )) : <PlayingCard name={''} borderStyle="dashed" opacity="50%"></PlayingCard>}
                    </HStack>
                </HStack>
                </Center>
            </Box>


        );
    }
})


