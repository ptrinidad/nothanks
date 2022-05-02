import { makeObservable, observable, computed, action } from "mobx";
import {ComplexityAnalyst, GameAction} from "./decision";
import UniqueGameElement from "./gameElement"
import Player from "./player";

export type GameStatus = "open" | "playing" | "finished";

export default abstract class GameState {
    gameElements: UniqueGameElement[];
    complexityAnalyst?: ComplexityAnalyst;
    players: Player[];
    status: GameStatus;

    public constructor (protected _minPlayers = 1, protected _maxPlayers = 5, players: Player[] = [], gameElements: UniqueGameElement[], status?: GameStatus, complexityAnalyst?: ComplexityAnalyst) {
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
            enoughPlayers: computed,
            isMaxPlayersReached: computed,
            startGame: action,
        });
    }
    protected abstract computeAvailableActions() : GameAction[];

    public get minPlayers() {
        return this._minPlayers;
    }

    public get maxPlayers() {
        return this._maxPlayers;
    }

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

    public get enoughPlayers() {
        return this.players.length >= this.minPlayers && this.players.length <= this.maxPlayers;
    }

    public get isMaxPlayersReached() {
        return this.players.length === this.maxPlayers;
    };

    public startGame() : boolean {
        if (this.status === "open" && this.enoughPlayers) {
            this.status = "playing";
            return true;
        } else {
            return false;
        }
    }
}