import { makeObservable, observable, computed, action } from "mobx";
import {ComplexityAnalyst, GameAction} from "./decision";
import UniqueGameElement from "./gameElement"
import Player from "./player";

export type GameStatus = "open" | "inplay" | "gameover";

export default abstract class GameState {
    gameElements: UniqueGameElement[];
    complexityAnalyst?: ComplexityAnalyst;
    players: Player[];
    status: GameStatus;

    public constructor (players: Player[], gameElements: UniqueGameElement[], status?: GameStatus, complexityAnalyst?: ComplexityAnalyst) {
        this.players = players;
        this.gameElements = gameElements;
        this.complexityAnalyst = complexityAnalyst;
        if (status) {
            this.status = status;
        } else {
            this.status = "open";
        }
        makeObservable (this, {
            players: observable,
            availableActions: computed,
            status: observable,
            gameElements: observable,
        });
    }
    protected abstract computeAvailableActions() : GameAction[];

    public get availableActions () : GameAction[] {
        const res = this.computeAvailableActions ();
        if (ComplexityAnalyst) {
            this.complexityAnalyst?.addDecision(res.length);
        }
        return res;
    }

    public makeDecision(decision: GameAction) {
        if (this.availableActions.indexOf(decision) !== -1) {
            decision.execute(this);
        }
    }
}