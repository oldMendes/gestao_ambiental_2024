import { describe, expect, it } from 'vitest'

function sum(a, b) {
  return a + b
}

describe('Inital Tests', () => {
  it('should be able sum two values', () => {
    const firstValue = 2;
    const secondValue = 3;

    let result = sum(firstValue, secondValue);

    expect(result).toEqual(5)
  })
})