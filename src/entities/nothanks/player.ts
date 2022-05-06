import { action, computed, makeObservable, observable, override } from "mobx";

import { NoThanksCard } from "./nothankscard";
import { Resources, chipType } from "./common";

import OrderedCardHolder from "../framework/orderedcardholder";
import Player from "../framework/player";
import ResourcesPool from "../framework/resourcesPool";


export default class NoThanksPlayer extends Player {
    _pool: ResourcesPool<Resources>;
    _cards: OrderedCardHolder<NoThanksCard>;

    public constructor (name: string) {
        super (name);
        this._pool = new ResourcesPool();
        this._pool.addResources(chipType,11);
        this._cards = new OrderedCardHolder<NoThanksCard>([], (a,b) => (b.value - a.value));
        makeObservable(this, {
            name: override,
            _pool: observable,
            _cards: observable,
            score: computed,
            payChip: action,
            hasEnoughChips: computed,
        });
    }

    public get score() : number {
        let res = this._pool.getResources(chipType) || 0;
        const numbers = this._cards.cards.map((c) => (c.value))
        const sortedNumbers = numbers.sort((a,b) => (b - a));
        for (let i = 0; i < sortedNumbers.length; i++) {
            res += sortedNumbers[i];
            let j = i + 1;
            while (j < sortedNumbers.length) {
                if (sortedNumbers[j] == sortedNumbers[j-1] - 1) {
                    i++; j++;
                } else {
                    break;
                }
            }
        }
        return res;
    }

    public payChip() : void {
        this._pool.removeResources(chipType, 1);
    }

    public unpayChip() : void {
        this._pool.addResources(chipType, 1);
    }

    public get hasEnoughChips() : boolean {
        const chips = this._pool.getResources(chipType) || 0;
        return chips > 0;
    }
}