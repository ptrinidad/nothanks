import NoThanksState from 'src/entities/nothanks/gameState'
import NoThanksPlayer from 'src/entities/nothanks/player'

const players = [new NoThanksPlayer("Player 1"),
                 new NoThanksPlayer("Player 2"),
                 new NoThanksPlayer("Player 3"),];
const gameState = new NoThanksState(players,[]);

export default gameState;