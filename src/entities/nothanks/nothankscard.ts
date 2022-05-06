import Card from "../framework/card"

export class NoThanksCard extends Card {
    readonly value: number;
    public constructor (value: number) {
        super (value.toString());
        this.value = -value;
    }

    public toString() : string {
        return (-this.value).toString();
    }
}