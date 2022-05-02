import { makeObservable, observable } from "mobx";

export default class Player {
    public color: string;

    public constructor (public name: string, color?: string) {
        if (!color) {
            this.color = "#" + (Math.floor(Math.random() * 2 ** 24)).toString(16).padStart(6, "0");
        } else {
            this.color = color;
        }
        makeObservable(this, {
            name: observable,
            color: observable,
        });
    }


}