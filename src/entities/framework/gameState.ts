import { makeObservable, observable, computed, action } from "mobx";
import GameHistory from "./gameHistory";
import GameAction from "./gameAction";
import UniqueGameElement from "./gameElement"
import Player from "./player";
import ComplexityAnalyst from "./complexityAnalyst";

export type GameStatus = "open" | "playing" | "finished";

export default abstract class GameState {
    gameElements: UniqueGameElement[];
    complexityAnalyst?: ComplexityAnalyst;
    status: GameStatus;
    history: GameHistory;

    public constructor (protected _minPlayers = 1, protected _maxPlayers = 5, protected _players: Player[] = [], gameElements: UniqueGameElement[], status?: GameStatus, complexityAnalyst?: ComplexityAnalyst) {
        this.gameElements = gameElements;
        this.complexityAnalyst = complexityAnalyst;
        if (status) {
            this.status = status;
        } else {
            this.status = "open";
        }
        this.history = new GameHistory();
        makeObservable (this, {
            players: computed,
            availableActions: computed,
            status: observable,
            gameElements: observable,
            enoughPlayers: computed,
            isMaxPlayersReached: computed,
            startGame: action,
            history: observable,
            canUndo: computed,
        });
    }
    protected abstract computeAvailableActions() : GameAction[];

    public get minPlayers() {
        return this._minPlayers;
    }

    public get maxPlayers() {
        return this._maxPlayers;
    }

    public get players() : Player[] {
        return this._players;
    }

    public get availableActions () : GameAction[] {
        const res = this.computeAvailableActions ();
        if (ComplexityAnalyst) {
            this.complexityAnalyst?.addDecision(res.length);
        }
        return res;
    }

    public executeAction(action: GameAction) {
        if (this.availableActions.indexOf(action) !== -1) {
            action.execute(this);
            this.history.addAction(action);
        }
    }

    public undoAction() {
        const action = this.history.removeAction();
        if (action) {
            action.undo(this);
        }
    }

    public get canUndo() {
        return this.history.length > 0;
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