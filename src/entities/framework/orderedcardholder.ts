import { override, makeObservable } from "mobx";
import Card from "./card";
import CardHolder from "./cardholder";

export default class OrderedCardHolder<C extends Card> extends CardHolder<C> {
    protected comparator: (a: C, b: C) => number;

    public constructor(cards: C[], comparator: (a: C, b: C) => number) {
        super(cards);
        this.comparator = comparator;
        this.cards.sort(comparator);

        makeObservable(this,
            {
                cards: override,
                addCard: override,
                removeCard: override,
                moveCard: override,
                pop: override,
                shuffle: override,
                head: override,
                size: override,
                hasCards: override,
            }
        );
    }

    /* add cards, keeping order in case a comparator is provided using binary search insertion */
    public addCard(card: C) {
        if (this.cards.length == 0 || this.comparator === undefined) {
            this.cards.push(card);
            return;
        }

        var minIndex = 0;
        var maxIndex = this.cards.length - 1;
        var current = (maxIndex + minIndex) / 2 | 0;
        var found = false;
        while (minIndex <= maxIndex) {
            const c = this.comparator(this.cards[current], card);
            if (c < 0) {
                minIndex = current + 1;
            } else if (c > 0) {
                maxIndex = current - 1;
            } else {
                found = true;
                this.cards.splice(current, 0, card);
                break;
            }
            current = (maxIndex + minIndex) / 2 | 0;
        }
        if (!found) {
            const c = this.comparator(this.cards[current], card);
            if (c < 0) { current++; }
            this.cards.splice(current, 0, card);
        }
    }
}