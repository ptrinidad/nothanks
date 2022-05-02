import UniqueGameElement from "./gameElement";


export default class ElementBag <E extends UniqueGameElement> extends UniqueGameElement {
    _elements: E[];

    public constructor ();
    public constructor (elements?: E[]) {
        super ();
        this._elements = elements ? [...elements] : [];
    }

    public get elements() : E[] {return this._elements;}
    public set elements(elements: E[]) {this._elements = [...elements];}

    public addElement(element: E) {
        this.elements = [...this.elements, element];
    }

    public getRandomElement(extract: boolean) : E | null {
        const size = this.elements.length;
        if (this.elements.length > 0) {
            const pos = Math.floor(Math.random() * size);
            const res = this.elements.at(pos);
            if (extract) {
                this._elements = this.elements.splice(pos,0);
            }
            return res || null;
        } else {
            return null;
        }
    }

    public extractRandomElement(): E | null {
        return this.getRandomElement(true);
    }
}