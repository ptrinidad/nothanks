import UniqueGameElement from "./gameElement";

export default abstract class AbstractDice extends UniqueGameElement {
    faces: number;

    public constructor (faces?: number) {
        super();
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
    public set value(v: number) {this._value = v;}

    public roll() : number {
        this.value = Math.floor(Math.random() * this.faces) + 1;
        return this.value;
    }
}

export class NonStandardDice extends AbstractDice {
    _value: number;
    _values: number [];
    public constructor (values: number[], current?: number) {
        super(values.length);
        if (this.faces <= 0 || (current && current >= values.length) ) {
            throw new Error();
        }
        this._values = [...values];
        this._value = this._values[current || 0];
    }

    public roll() : number {
         const pos = Math.floor(Math.random() * this.faces);
         this._value = this._values[pos];
         return this._value;
    }
}