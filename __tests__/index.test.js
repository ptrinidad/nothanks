// __tests__/index.test.jsx

//jest mock uuid with sucessive numbers from 0 to N
jest.mock('uuid', () => { return { v4: () => `${Math.floor(Math.random() * 100000)}` } });

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {StandardDice} from 'src/entities/framework/dice'

describe('Home', () => {
  test('dice between 1 and 6', () => {
    const dice = new StandardDice();
    const roll = dice.roll();

    expect(roll).toBeLessThanOrEqual(6);
    expect(roll).toBeGreaterThanOrEqual(1);
  })
})
