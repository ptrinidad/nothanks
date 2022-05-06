import {v4} from 'uuid';

export default class UniqueGameElement {
    _uid: string;

    public constructor();
    public constructor(id?: string) {
        this._uid = id ? id : v4();
    }
}