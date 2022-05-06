import UniqueGameElement from "./gameElement";


export default class ElementBag<E extends UniqueGameElement> extends UniqueGameElement {
    _elements: E[];

    public constructor();
    public constructor(elements?: E[]) {
        super();
        this._elements = (elements !== undefined) ? [...elements] : [];
    }

    public get elements(): E[] { return this._elements; }
    public set elements(elements: E[]) { this._elements = [...elements]; }

    public get size(): number { return this.elements.length; }
    public get isEmpty(): boolean { return this.size === 0; }

    public addElement(element: E) {
        this.elements = [...this.elements, element];
    }

    public removeElement(element: E) : boolean {
        const pos = this.elements.indexOf(element);
        if (pos > -1) {
            this.elements.splice(pos, 1);
            return true;
        }
        return false;
    }

    public getRandomElement(extract: boolean = true): E | null {
        const size = this.elements.length;
        if (this.elements.length > 0) {
            const pos = Math.floor(Math.random() * size);
            const res = this.elements[pos];
            if (extract) {
                this.elements.splice(pos, 1);
            }
            return res;
        }
        return null;
    }
}