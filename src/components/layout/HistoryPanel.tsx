import React from 'react';

import { observer } from 'mobx-react';
import { Badge, Box, Button, FlexProps, Heading, Spacer, Text, VStack } from '@chakra-ui/react';

import gameState from 'pages/store';

type IHistoryPanelProps = {
} & FlexProps;

const actionButtonStyle = {
    bg: 'brand.500',
    _hover: {
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
    }
}

export default observer(class HeadingPanel extends React.Component<IHistoryPanelProps, {}> {
    public constructor(props: IHistoryPanelProps) {
        super(props);
    }

    public render() {
        const history = gameState.history;

        return (
            (gameState.status === "playing" && gameState.canUndo) ? 
            <VStack>
                <Button m="1em" onClick={() => gameState.undoAction()} sx={actionButtonStyle}>Undo</Button>
            </VStack>
            : null
        );
    }
})
