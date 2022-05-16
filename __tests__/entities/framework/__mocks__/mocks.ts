import GameAction from "src/entities/framework/gameAction";
import ComplexityAnalyst from 'src/entities/framework/complexityAnalyst';
import UniqueGameElement from 'src/entities/framework/gameElement';
import GameState, {GameStatus} from 'src/entities/framework/gameState';

export class MockGameState extends GameState {
    public constructor (gameElements: UniqueGameElement[], status?: GameStatus, complexityAnalyst?: ComplexityAnalyst) {
        super(1, 5, [], gameElements, status, complexityAnalyst);
    }
    public computeAvailableActions() : GameAction[] {
        return [];
    }
}

export class MockGameAction extends GameAction {
    public constructor (public readonly action: string) { super(action); }
    public execute (state: any) { return state; }
    public undo (state: any) { return state; }
    public toString () { return `${this.action}`; }
}