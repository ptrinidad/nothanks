import '@testing-library/jest-dom'
import GameHistory from 'src/entities/framework/gameHistory';

import {MockGameAction} from './__mocks__/mocks';


describe('Empty history', () => {
    test('empty history is exactly empty', () => {
        const history = new GameHistory();
        expect(history.length).toBe(0);
        expect(history.log).toEqual([]);
    });

    test('empty history is empty after adding and removing', () => {
        const history = new GameHistory();
        history.addAction(new MockGameAction('test'));
        history.removeAction();

        expect(history.length).toBe(0);
        expect(history.log).toEqual([]);
    });
});

describe('History with actions', () => {
    test('history with two actions', () => {
        const history = new GameHistory();
        history.addAction(new MockGameAction('test1'));
        history.addAction(new MockGameAction('test2'));

        expect(history.length).toBe(2);
        expect(history.log).toEqual(['test1', 'test2']);
    });

    test('history with two actions', () => {
        const history = new GameHistory([new MockGameAction('test1')]);
        history.addAction(new MockGameAction('test2'));
        history.addAction(new MockGameAction('test3'));

        expect(history.length).toBe(3);
        expect(history.log).toEqual(['test1', 'test2', 'test3']);
    });
});

describe('Adding and removing actions', () => {
    test('adding 2, removing 1', () => {
        const history = new GameHistory();
        history.addAction(new MockGameAction('test1'));
        history.addAction(new MockGameAction('test2'));
        history.removeAction();
        history.addAction(new MockGameAction('test3'));

        expect(history.length).toBe(2);
        expect(history.log).toEqual(['test1', 'test3']);
    });

    test('remove without elements', () => {
        const history = new GameHistory();

        expect(history.removeAction()).toBeUndefined();
        
        expect(history.length).toBe(0);
        expect(history.log).toEqual([]);
    });
});