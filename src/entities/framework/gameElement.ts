import {v4 as uuidv4} from 'uuid';

export default class UniqueGameElement {
    _uid: string;

    public constructor();
    public constructor(id?: string) {
        this._uid = id ? id : uuidv4();
    }
}