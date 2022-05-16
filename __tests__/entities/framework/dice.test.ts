import '@testing-library/jest-dom'
import Dice, { NonStandardDice, StandardDice } from 'src/entities/framework/dice';

jest.mock('uuid', () => { return { v4: () => `${Math.floor(Math.random() * 100000)}` } });

describe('Standard dice tests', () => {
    test('Dice should be created with positive faces', () => {
        expect(() => new StandardDice(0)).toThrowError('Dice faces must be greater than 0');
    })

    test('Default 6-side standard dice rolls numbers between 1 and 6', () => {
        const dice = new StandardDice();
        for (let i = 0; i < 100; i++) {
            const rolledNumber = dice.roll()
            expect(rolledNumber).toBeGreaterThanOrEqual(1);
            expect(rolledNumber).toBeLessThanOrEqual(6);
            expect(dice.value).toBe(rolledNumber);
        }
    })

    const faces = Array.from(Array(100).keys()).map(i => i + 1);
    test.each(faces)('%j-side standard dice rolls numbers between 1 and %j', (faces: number) => {
        const dice = new StandardDice(faces);
        for (let i = 0; i < 100; i++) {
            const rolledNumber = dice.roll()
            expect(rolledNumber).toBeGreaterThanOrEqual(1);
            expect(rolledNumber).toBeLessThanOrEqual(faces);
            expect(dice.value).toBe(rolledNumber);
        }
    })

    test('N-side standard dice rolls numbers between 1 and 6', () => {
        const dice = new StandardDice();
        for (let i = 0; i < 100; i++) {
            const rolledNumber = dice.roll()
            expect(rolledNumber).toBeGreaterThanOrEqual(1);
            expect(rolledNumber).toBeLessThanOrEqual(6);
            expect(dice.value).toBe(rolledNumber);
        }
    })
})

describe('Non-standard dice tests', () => {
    test('Dice cannot be created without faces', () => {
        expect(() => new NonStandardDice([])).toThrowError('Dice faces must be greater than 0');
    });

    test('"Dice" with just one side', () => {
        const dice = new NonStandardDice([1]);
        expect(dice.value).toBe(1);
        expect(dice.faces).toBe(1);
    });

    test('Dice should be created with at least one value', () => {
        const valuesArray = [1, 2];
        const dice = new NonStandardDice(valuesArray);
        expect(dice.faces).toBe(2);

        for (let i = 0; i < 100; i++) {
            const rolledNumber = dice.roll()
            expect(valuesArray).toContain(rolledNumber);
        }
    });
})
