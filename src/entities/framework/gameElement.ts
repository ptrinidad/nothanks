import {v4} from 'uuid';

export default class UniqueGameElement {
    readonly _uid: string;

    public constructor(id?: string) {
        this._uid = (id !== undefined) ? id : v4();
    }

    public get uid() : string {return this._uid;}
}