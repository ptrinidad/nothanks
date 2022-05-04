import React from 'react';

import { observer } from 'mobx-react';
import { Box, Button, Center, FlexProps, HStack } from '@chakra-ui/react';

import gameState from 'pages/store';

import { chipType } from 'src/entities/nothanks/common';
import Chips from '../Chips';

type IChipsPanelProps = {
} & FlexProps;

export default observer(class ChipsPanel extends React.Component<IChipsPanelProps, {}> {
    public constructor(props: IChipsPanelProps) {
        super(props);
    }

    public render() {
        const currentPlayer = gameState.players[gameState.whoisturn];
        const playerChips = currentPlayer._pool.getResources(chipType) || 0;
        const boardChips = gameState.pool.getResources(chipType) || 0;
        const actions = gameState.availableActions;

        const actionButtonStyle = {
            bg: 'brand.500',
            _hover: {
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
            }
        }

        const action = actions.find((action) => action.actionName === 'Pass');

        return (
            <Box {...this.props} p="1em">
                <Center>
                    <HStack spacing={0}>
                        <Center m="1em" w='70px'>
                            <Chips chips={boardChips} />
                        </Center>
                        <Center m="1em" w='10em'>
                            {action ? <Button key={action.actionName} sx={actionButtonStyle} onClick={() => gameState.executeAction(action)}>{action.actionName}</Button> : null}
                        </Center>
                        <Center m="1em" w='70px'>
                            <Chips chips={playerChips} />
                        </Center>
                    </HStack>
                </Center>
            </Box>


        );
    }
})


