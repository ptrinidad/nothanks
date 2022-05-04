import { action, computed, makeObservable, observable } from "mobx";
import GameState from "./gameState";

export abstract class GameAction {
    constructor (public actionName: string) {}
    public abstract execute (state: GameState) : GameState;
    public abstract undo (state: GameState) : GameState;
}

export class GameHistory {
    _actionsHistory: GameAction[];

    public constructor ()
    public constructor (actionHistory?: GameAction[]) {
        if (actionHistory) {
            this._actionsHistory = actionHistory;
        } else {
            this._actionsHistory = [];
        }
        makeObservable (this, {
            _actionsHistory: observable,
            addAction: action,
            undoAction: action,
            length: computed,
        });
    }

    public addAction (action: GameAction) {
        if (action) {
            this._actionsHistory.push(action);
        }
    }

    public undoAction (state: GameState) : GameState {
        const lastAction = this._actionsHistory.pop();
        if (lastAction) {
            return lastAction.undo(state);
        }
        return state;
    }

    public get length () : number {
        return this._actionsHistory.length;
    }
}

export class ComplexityAnalyst {
    _decisionComplexity: Map<number,number>;

    public constructor() {
        this._decisionComplexity = new Map<number,number>();
    }

    public addDecision(complexity: number) {
        this._decisionComplexity.set(complexity, (this._decisionComplexity.get(complexity) || 0 )+1 );
    }
}