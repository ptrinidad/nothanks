import GameState from "./gameState";

export default abstract class GameAction {
    constructor (public actionName: string) {}
    public abstract execute (state: GameState) : GameState;
    public abstract undo (state: GameState) : GameState;
    public abstract toString () : string;
}
