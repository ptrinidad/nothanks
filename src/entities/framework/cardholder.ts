import { computed, makeObservable, action, observable } from "mobx";
import Card from "./card";

export default class CardHolder<C extends Card> {
    cards: C[];

    public constructor(cards?: C[]) {
        this.cards = cards ? [...cards] : [];

        makeObservable(this,
            {
                cards: observable,  
                addCard: action,
                removeCard: action,
                moveCard: action,
                pop: action,
                shuffle: action,
                head: computed,
                size: computed,
                hasCards: computed,
            }
        );
    }

    public addCard(card: C) {
            this.cards.push(card);
    }

    public removeCard(card: C): boolean {
        const pos = this.cards.indexOf(card);
        if (pos != -1) {
            this.cards = this.cards.splice(pos, 0);
            return true;
        } else {
            return false;
        }
    }
    public moveCard(card: C, holder: CardHolder<C>): boolean {
        const res = this.removeCard(card);
        holder.addCard(card);
        return res;
    }

    public get head(): C {
        return this.cards[this.cards.length - 1];
    }

    public pop(destinationHolder?: CardHolder<C>): C | undefined {
        const res = this.cards.pop();
        if (res && destinationHolder) {
            destinationHolder.addCard(res);
        }
        return res;
    }

    public get size(): number {
        return this.cards.length;
    }

    public get hasCards(): boolean {
        return this.cards.length > 0;
    }

    /* 
    * Fisher–Yates Shuffle: see https://bost.ocks.org/mike/shuffle/
    */
    public shuffle() {
        var m = this.cards.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = this.cards[m];
            this.cards[m] = this.cards[i];
            this.cards[i] = t;
        }

        return this.cards;
    }
}