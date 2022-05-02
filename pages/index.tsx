import Head from 'next/head'
import React from 'react'

import { observer } from 'mobx-react'

import { Flex } from '@chakra-ui/react'

import SummaryPanel from 'src/components/layout/SummaryPanel'
import CardsPanel from 'src/components/layout/CardsPanel'
import HeadingPanel from 'src/components/layout/HeadingPanel'
import ChipsPanel from 'src/components/layout/ChipsPanel'

import gameState from 'pages/store'

export default observer(class Play extends React.Component<{}, {}> {
  public constructor(props: {}) {
    super(props);
  }

  public render() {
    return (
      <>
        <Head>
          <title>No Thanks!</title>
          <meta name="description" content="No Thanks!" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <HeadingPanel flex="1 1 100%" />
        {gameState.status === "playing" ? 
          <Flex justifyContent="center" align="stretch" wrap="wrap">
            <CardsPanel flex="0 1 100%" />
            <ChipsPanel flex="0 1 100%" />
          </Flex>
        : null}
        <SummaryPanel />
      </>
    )
  }
})


