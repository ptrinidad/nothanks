import React from 'react';
import { observer } from 'mobx-react';
import { Badge, Box, Center, FlexProps, HStack } from '@chakra-ui/react';

import gameState from 'pages/store';

import { chipType } from 'src/entities/nothanks/common';
import NoThanksCard from 'src/components/PlayingCard';
import Chips from 'src/components/Chips';

type IBoardPanelProps = {
} & FlexProps;

export default observer(class BoardPanel extends React.Component<IBoardPanelProps, {}> {
    public constructor(props: IBoardPanelProps) {
        super(props);
    }

    public render() {
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

        const deckSize = gameState.deck.size;
        const card = gameState.deck.head;
        const chips = gameState.pool.getResources(chipType) || 0;
        
        return (
            <Box {...this.props} w="100%" padding="2em" bgColor="brand.50">
                <Center>
                <HStack>
                    <Box m="1em" position="relative" w={deckWidth}>
                        <NoThanksCard sx={deckStyle} {...card} />
                        <Badge variant="outline" colorScheme="brand" sx={badgeStyle}>{deckSize}</Badge>
                    </Box>
                    <Chips m="1em" chips={chips}/>
                </HStack>
                </Center>
            </Box>
        )
    }
})


