import { GameAction } from "../framework/decision";
import NoThanksState from "./gameState";

export class PassAction extends GameAction {
    public constructor () {
        super ("Pass");
    }

    public execute (state: NoThanksState) : NoThanksState {
        return state.payChip()
                    .passTurn();
    }
    public undo (state: NoThanksState) {
        return state.revokeTurn()
                    .unpayChip();
    }
}

export class GetCardAction extends GameAction {
    public constructor (protected chipsAmount: number) {
        super("Get card");
    }
    public execute(state: NoThanksState): NoThanksState {
        return state.playerGetsCurrentCard().passTurn();
    }
    public undo(state: NoThanksState): NoThanksState {
        return state.revokeTurn()
                    .undoPlayerGetsCurrentCard(this.chipsAmount);
    }

}