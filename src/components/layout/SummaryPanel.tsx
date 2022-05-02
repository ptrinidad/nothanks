import React, { useRef } from 'react';

import { observer } from 'mobx-react';
import { Button, Box, Flex, useDimensions, Center } from '@chakra-ui/react';

import gameState from 'pages/store';

import NoThanksPlayer from 'src/entities/nothanks/player';
import { chipType } from 'src/entities/nothanks/common'

import PlayerProfile from 'src/components/PlayerProfile';
import MiniPlayerProfile from 'src/components/MiniPlayerProfile';


export interface IPanelProps {
}

function onAddPlayer(event: React.MouseEvent<HTMLButtonElement>) {
    gameState.addPlayer("Player " + (gameState.players.length + 1));
}

function onStart(event: React.MouseEvent<HTMLButtonElement>) {
    gameState.startGame();
}

export default observer(function SummaryPanel(props: IPanelProps) {
    const boxRef = useRef(null);
    const dimensions = useDimensions(boxRef, true);
    const isMiniVersion = dimensions && dimensions.borderBox.width < 190 * gameState.players.length;
    const sticky = {
        position: "sticky",
        width: "full",
        bottom: "0",
    }
    return (
        <Box ref={boxRef} __css={isMiniVersion ? sticky : {}} bgColor="brand.50">
            <Flex bgColor="brand.50" justifyContent="center">
                {gameState.players.map((p: NoThanksPlayer, index: number) => {
                    const chips = p._pool.getResources(chipType) || 0;
                    const isCurrent = gameState.whoisturn === index;
                    const info = new Map<string, string>().
                        set("Score", p.score.toString()).
                        set("Chips", chips.toString());
                    return (
                        isMiniVersion
                            ? <MiniPlayerProfile m="2px" key={"MiniPlayerProfile"+p.name} name={p.name} color={p.color} info={info} active={isCurrent} />
                            : <PlayerProfile m="10px" key={"PlayerProfile"+p.name} name={p.name} color={p.color} info={info} active={isCurrent} />
                    )
                })
                }
            </Flex>
            <Center>
                {gameState.status === "open" ? <Button bgColor="brand.500" onClick={(e) => { onAddPlayer(e) }}>Add player</Button> : null}
            </Center>
            <Center>
                {gameState.status === "open" ? <Button bgColor="brand.500" onClick={(e) => { onStart(e) }}>Start</Button> : null}
            </Center>
        </Box>
    )
}
)


