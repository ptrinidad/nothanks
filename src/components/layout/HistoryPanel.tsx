import React from 'react';

import { observer } from 'mobx-react';
import { Button, FlexProps, Textarea, VStack } from '@chakra-ui/react';

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
            <VStack w="100%">
                <LogArea value={history.log.join("\n")} />
                <Button m="1em" onClick={() => gameState.undoAction()} sx={actionButtonStyle}>Undo</Button>
            </VStack>
            : null
        );
    }
})

const LogArea = (props: any) => {
    const ref = React.useRef<HTMLTextAreaElement>(null);
    React.useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [props.value]);
    return (
        <Textarea ref={ref} m="1em" isFullWidth isReadOnly value={props.value} />
    );
}
