import { values } from "mobx";
import UniqueGameElement from "./gameElement";

export default abstract class AbstractDice extends UniqueGameElement {
    faces: number;

    public constructor (faces?: number) {
        super();
        if (faces !== undefined && faces < 1) {
            throw new Error("Dice faces must be greater than 0");
        }
        this.faces = faces ? faces : 6;
    }

    public abstract roll() : any;
}

export class StandardDice extends AbstractDice {
    _value: number;
    public constructor (faces?: number) {
        super(faces);
        this._value = this.roll();
    }

    public get value() : number  {return this._value;}
    public set value(v: number) {
        if (v <= this.faces && v >= 1) {
            this._value = v;
        } else {
            throw new Error("value " + v + " is not valid for " + this.faces + "-sided dice");
        }
    }

    public roll() : number {
        this.value = Math.floor(Math.random() * this.faces) + 1;
        return this.value;
    }
}

export class NonStandardDice extends AbstractDice {
    _value: number;
    _values: number [];
    public constructor (values: number[]) {
        super(values.length);

        this._values = [...values];
        this._value = this.roll();
    }

    public get value() : number  {return this._value;}
    public set value(v: number) {
        if (this._values.includes(v)) {
            this._value = v;
        } else {
            throw new Error("value " + v + " is not valid for the non-standard dice " + this._values);
        }
    }

    public roll() : number {
         const pos = Math.floor(Math.random() * this.faces);
         this._value = this._values[pos];
         return this._value;
    }
}