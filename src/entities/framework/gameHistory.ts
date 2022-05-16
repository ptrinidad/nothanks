import { action, computed, makeObservable, observable } from "mobx";

import GameAction from "./gameAction";

export default class GameHistory {
    _actionsHistory: GameAction[];
    _log: string[];

    public constructor (actionHistory?: GameAction[], log?: string[]) {
        this._actionsHistory = actionHistory || [];
        if (log !== undefined)  {
            this._log = log;
        } else {
            this._log = this._actionsHistory.map(action => action.toString());
        }
        
        makeObservable (this, {
            _actionsHistory: observable,
            _log: observable,
            addAction: action,
            removeAction: action,
            length: computed,
            log: computed,
        });
    }

    public addAction (action: GameAction) {
        if (action) {
            this._actionsHistory.push(action);
            this._log.push(action.toString());
        }
    }

    public removeAction () : GameAction | undefined {
        const lastAction = this._actionsHistory.pop();
        if (lastAction) {
            this._log.pop();
        }
        return lastAction;
    }

    public get length () : number {
        return this._actionsHistory.length;
    }

    public get log () : string[] {
        return this._log;
    }
}