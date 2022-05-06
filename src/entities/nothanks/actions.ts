import GameAction from "../framework/gameAction";
import NoThanksState from "./gameState";
import { NoThanksCard } from "./nothankscard";
import NoThanksPlayer from "./player";

export class PassAction extends GameAction {
    private player?: NoThanksPlayer;

    public constructor () {
        super ("Pass");
    }

    public execute (state: NoThanksState) : NoThanksState {
        this.player = state.currentPlayer;
        if (this.player.hasEnoughChips) {
            this.player.payChip();
            state.addChipToPool();
        }
        return state.passTurn();
    }

    public undo (state: NoThanksState) {
        if (this.player) {
            state.revokeTurn();
            state.removeChipFromPool();
            this.player.unpayChip();
        }
        return state;
    }

    public toString () : string {
        return this.player?.name + " passes.";
    }
}

export class GetCardAction extends GameAction {
    protected player?: NoThanksPlayer;

    public constructor (protected card: NoThanksCard, protected chipsAmount: number) {
        super("Get card");
    }
    public execute(state: NoThanksState): NoThanksState {
        this.player = state.currentPlayer;
        return state.playerGetsCurrentCard()
                    .passTurn();
    }
    public undo(state: NoThanksState): NoThanksState {
        if (this.player) {
            state.revokeTurn()
                    .undoPlayerGetsCurrentCard(this.card, this.chipsAmount);
        }
        return state;
    }

    public toString(): string {
        return this.player?.name + " draws card with value " + this.card.toString();
    }
}