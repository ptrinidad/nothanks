import '@testing-library/jest-dom'
import ElementsBag from 'src/entities/framework/elementsBag';
import UniqueGameElement from 'src/entities/framework/gameElement';

jest.mock('uuid', () => { return { v4: () => `${Math.floor(Math.random() * 100000)}` } });

describe('Empty elements bag', () => {
    test('empty elements bag is exactly empty', () => {
        const holder = new ElementsBag<UniqueGameElement>();
        expect(holder.isEmpty).toBe(true);
        expect(holder.elements).toEqual([]);
        expect(holder.size).toBe(0);

        expect(holder.getRandomElement()).toBeNull();
    })

    test('Elements bag is empty after adding and removing one element', () => {
        const holder = new ElementsBag<UniqueGameElement>();
        const element = new UniqueGameElement();

        holder.addElement(element);
        holder.getRandomElement();

        expect(holder.isEmpty).toBe(true);
        expect(holder.elements).toEqual([]);
        expect(holder.size).toBe(0);

        expect(holder.getRandomElement()).toBeNull();
    })
})

describe('Elements bag with elements', () => {
    test('elements bag with 3 elements, just adding', () => {
        const holder = new ElementsBag<UniqueGameElement>();
        const a = new UniqueGameElement("A");
        const b = new UniqueGameElement("B");
        const c = new UniqueGameElement("C");

        holder.addElement(a);
        holder.addElement(b);
        holder.addElement(c);

        expect(holder.isEmpty).toBe(false);
        expect(holder.elements).toEqual([a,b,c]);
        expect(holder.size).toBe(3);
    });

    test('elements bag adding 2 elements, removing one at random', () => {
        const holder = new ElementsBag<UniqueGameElement>();
        const a = new UniqueGameElement("A");
        const b = new UniqueGameElement("B");

        holder.addElement(a);
        holder.addElement(b);
        const element = holder.removeElement(b);

        expect(holder.isEmpty).toBe(false);
        expect(holder.elements).toEqual(expect.arrayContaining([a]));
        expect(holder.size).toBe(1);

        holder.removeElement(a);
        expect(holder.isEmpty).toBe(true);
        expect(holder.elements).toEqual([]);
        expect(holder.size).toBe(0);
    });

    test('elements bag adding 2 elements, removing one at random', () => {
        const holder = new ElementsBag<UniqueGameElement>();
        const a = new UniqueGameElement("A");
        const b = new UniqueGameElement("B");

        holder.addElement(a);
        holder.addElement(b);
        const element = holder.getRandomElement();

        expect(holder.isEmpty).toBe(false);
        expect([a,b]).toContain(element);
        expect(holder.size).toBe(1);
    });

    test('elements bag adding 2 elements, getting a random one withour removing', () => {
        const holder = new ElementsBag<UniqueGameElement>();
        const a = new UniqueGameElement("A");
        const b = new UniqueGameElement("B");

        holder.addElement(a);
        holder.addElement(b);
        const element = holder.getRandomElement(false);

        expect(holder.isEmpty).toBe(false);
        expect([a,b]).toContain(element);
        expect(holder.elements).toEqual(expect.arrayContaining([a,b]));
        expect(holder.size).toBe(2);
    });
})  