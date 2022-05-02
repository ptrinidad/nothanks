import GameState from "./gameState";
import Player from "./player";

export default class Game {

    _state: GameState;

    public constructor(state: GameState) {

        this._state = state;
    }

    public get state () {return this._state;}
    public set state (state: GameState) {this._state = state;}
    
}