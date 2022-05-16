import '@testing-library/jest-dom'
import OrderedCardHolder from 'src/entities/framework/orderedcardholder';
import Card from 'src/entities/framework/card';

jest.mock('uuid', () => { return { v4: () => `${Math.floor(Math.random() * 100000)}` } });
const comparator = (a: Card, b: Card) => a.name.localeCompare(b.name);

describe('Cardholder without cards', () => {
  test('empty cardholder is exactly empty', () => {
    const holder = new OrderedCardHolder<Card>([], comparator);
    expect(holder.cards).toBeDefined();
    expect(holder.hasCards).toBe(false);
    expect(holder.size).toBe(0);
    expect(holder.head).toBeUndefined();
    expect(holder.pop()).toBeUndefined();
})
})

// test cardholder with cards
describe('Cardholder with cards', () => {
    test('1-card cardholder', () => {
        const holder = new OrderedCardHolder<Card>([], comparator);

        holder.addCard(new Card("A"));

        expect(holder.hasCards).toBe(true);
        expect(holder.size).toBe(1);
        expect(holder.head).toBeDefined();
        expect(holder.pop()).toBeDefined();
    })

    test('2-card cardholder', () => {
        const holder = new OrderedCardHolder<Card>([], comparator);
        const cardA = new Card("A");
        const cardB = new Card("B");
        holder.addCard(cardB);
        holder.addCard(cardA);
        
        expect(holder.hasCards).toBe(true);
        expect(holder.size).toBe(2);
        expect(holder.head).toMatchObject(cardB);
        expect(holder.pop()).toMatchObject(cardB);
        expect(holder.pop()).toMatchObject(cardA);
    })
    
    test('3-card cardholder', () => {
        const holder = new OrderedCardHolder<Card>([], comparator);
        const card3 = new Card("3");

        holder.addCard(new Card("1"));
        holder.addCard(new Card("2"));
        holder.addCard(card3);

        expect(holder.hasCards).toBe(true);
        expect(holder.size).toBe(3);
        expect(holder.head).toMatchObject(card3);
        expect(holder.pop()).toMatchObject(card3);
        expect(holder.size).toBe(2);
    })

    test('2-card cardholder after removing', () => {
        const holder = new OrderedCardHolder<Card>([], comparator);
        const card2 = new Card("2");
        const card3 = new Card("3");

        holder.addCard(new Card("1"));
        holder.addCard(card2);
        holder.addCard(card3);
        holder.removeCard(card3);
        
        expect(holder.hasCards).toBe(true);
        expect(holder.size).toBe(2);
        expect(holder.head).toMatchObject(card2);
        expect(holder.pop()).toMatchObject(card2);
        expect(holder.size).toBe(1);  
    })

    test('check if cardholder is ordered by constructor', () => {
        const numbers = [4, 5, 1, 7, 3, 9, 2, 6, 10, 8];
        const cards = numbers.map(n => new Card(n.toString()));
        const holder = new OrderedCardHolder<Card>(cards, comparator);
        const orderednumbers = [1, 10, 2, 3, 4, 5, 6, 7, 8, 9];
        const orderedcards = orderednumbers.map(n => cards.find(c => c.name === n.toString()));

        expect(holder.size).toBe(10);
        expect(holder.cards).toEqual(orderedcards);
    })

    test('check if a longer unordered array insertion is ordered', () => {
        const numbers = [4, 5, 1, 7, 3, 9, 2, 6, 10, 8];
        const cards = numbers.map(n => new Card(n.toString()));
        const holder = new OrderedCardHolder<Card>([], comparator);
        cards.map(c => holder.addCard(c));

        const orderednumbers = [1, 10, 2, 3, 4, 5, 6, 7, 8, 9];
        const orderedcards = orderednumbers.map(n => cards.find(c => c.name === n.toString()));

        expect(holder.size).toBe(10);
        expect(holder.cards).toEqual(orderedcards);
    })
});

describe('movement between cardholders', () => {
    test('move card from empty to empty', () => {
        const holder1 = new OrderedCardHolder<Card>([], comparator);
        const holder2 = new OrderedCardHolder<Card>([], comparator);
        const card1 = new Card("1");

        
        holder1.addCard(card1);
        holder1.moveCard(card1, holder2);

        expect(holder1.hasCards).toBe(false);
        expect(holder1.size).toBe(0);
        expect(holder1.head).toBeUndefined();
        expect(holder1.pop()).toBeUndefined();

        expect(holder2.hasCards).toBe(true);
        expect(holder2.size).toBe(1);
        expect(holder2.head).toMatchObject(card1);
        expect(holder2.pop()).toMatchObject(card1);
        expect(holder2.size).toBe(0);
        expect(holder2.head).toBeUndefined();
        expect(holder2.pop()).toBeUndefined();
    })

    test('move card from empty to empty', () => {
        const holder1 = new OrderedCardHolder<Card>([], comparator);
        const holder2 = new OrderedCardHolder<Card>([], comparator);
        const card1 = new Card("1");
        const card2 = new Card("2");
        const card3 = new Card("3");
        
        holder1.addCard(card1);
        holder1.addCard(card2);
        holder1.addCard(card3);
        holder1.moveCard(card2, holder2);
        holder1.moveCard(card3, holder2);
        holder1.moveCard(card1, holder2);

        expect(holder1.hasCards).toBe(false);
        expect(holder1.size).toBe(0);
        expect(holder1.head).toBeUndefined();
        expect(holder1.pop()).toBeUndefined();

        expect(holder2.hasCards).toBe(true);
        expect(holder2.size).toBe(3);
        expect(holder2.head).toMatchObject(card3);
        expect(holder2.pop()).toMatchObject(card3);
        expect(holder2.pop()).toMatchObject(card2);
        expect(holder2.pop()).toMatchObject(card1);
        expect(holder2.size).toBe(0);
        expect(holder2.head).toBeUndefined();
        expect(holder2.pop()).toBeUndefined();
    })

    test('move card from empty to empty', () => {
        const holder1 = new OrderedCardHolder<Card>([], comparator);
        const holder2 = new OrderedCardHolder<Card>([], comparator);
        const card1 = new Card("1");
        const card2 = new Card("2");
        const card3 = new Card("3");
        
        holder1.addCard(card2);
        holder1.addCard(card3);
        holder1.addCard(card1);
        holder1.moveCard(card2, holder2);
        // pop also moves card between holders
        holder1.pop(holder2);

        expect(holder1.hasCards).toBe(true);
        expect(holder1.size).toBe(1);
        expect(holder1.head).toMatchObject(card1);
        expect(holder1.pop()).toMatchObject(card1);

        expect(holder2.hasCards).toBe(true);
        expect(holder2.size).toBe(2);
        expect(holder2.head).toMatchObject(card3);
        expect(holder2.pop()).toMatchObject(card3);
        expect(holder2.pop()).toMatchObject(card2);
        expect(holder2.head).toBeUndefined();
        expect(holder2.pop()).toBeUndefined();
    })
});