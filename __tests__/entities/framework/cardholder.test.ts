import '@testing-library/jest-dom'
import CardHolder from 'src/entities/framework/cardholder';
import Card from 'src/entities/framework/card';

jest.mock('uuid', () => { return { v4: () => `${Math.floor(Math.random() * 100000)}` } });

describe('Cardholder without cards', () => {
  test('empty cardholder is exactly empty', () => {
    const holder = new CardHolder<Card>();
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
        const holder = new CardHolder<Card>();

        holder.addCard(new Card(""));

        expect(holder.hasCards).toBe(true);
        expect(holder.size).toBe(1);
        expect(holder.head).toBeDefined();
        expect(holder.pop()).toBeDefined();
    })

    test('2-card cardholder', () => {
        const holder = new CardHolder<Card>();

        holder.addCard(new Card(""));
        holder.addCard(new Card(""));
        
        expect(holder.hasCards).toBe(true);
        expect(holder.size).toBe(2);
        expect(holder.head).toBeDefined();
        expect(holder.pop()).toBeDefined();
    })
    
    test('3-card cardholder', () => {
        const holder = new CardHolder<Card>();
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
        const holder = new CardHolder<Card>();
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
});

describe('movement between cardholders', () => {
    test('move card from empty to empty', () => {
        const holder1 = new CardHolder<Card>();
        const holder2 = new CardHolder<Card>();
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
        const holder1 = new CardHolder<Card>();
        const holder2 = new CardHolder<Card>();
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
        expect(holder2.head).toMatchObject(card1);
        expect(holder2.pop()).toMatchObject(card1);
        expect(holder2.pop()).toMatchObject(card3);
        expect(holder2.pop()).toMatchObject(card2);
        expect(holder2.size).toBe(0);
        expect(holder2.head).toBeUndefined();
        expect(holder2.pop()).toBeUndefined();
    })

    test('move card from empty to empty', () => {
        const holder1 = new CardHolder<Card>();
        const holder2 = new CardHolder<Card>();
        const card1 = new Card("1");
        const card2 = new Card("2");
        const card3 = new Card("3");
        
        holder1.addCard(card1);
        holder1.addCard(card2);
        holder1.addCard(card3);
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

describe('shuffle', () => {
    test('shuffle', () => {
        const holder = new CardHolder<Card>();
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const cards = numbers.map(n => new Card(n.toString()));
        holder.addCards(cards);
        holder.shuffle();
        expect(holder.size).toBe(10);
        expect(holder.cards).toEqual(expect.arrayContaining(cards));
    })
});
