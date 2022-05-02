import UniqueGameElement from "./gameElement";

export interface ICard {
    name: string,
    value?: number,
    cost?: any,
}

export default class Card extends UniqueGameElement implements ICard {
    public constructor (readonly name: string) {
        super();
    }
}