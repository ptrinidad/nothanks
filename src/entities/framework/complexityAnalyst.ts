export default class ComplexityAnalyst {
    _decisionComplexity: Map<number,number>;

    public constructor() {
        this._decisionComplexity = new Map<number,number>();
    }

    public addDecision(complexity: number) {
        this._decisionComplexity.set(complexity, (this._decisionComplexity.get(complexity) || 0 )+1 );
    }
}