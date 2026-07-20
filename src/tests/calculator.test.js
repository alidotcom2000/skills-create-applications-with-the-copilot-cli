const c = require('../calculator');

describe('Calculator functions', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(c.add(2, 3)).toBe(5);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(c.subtract(10, 4)).toBe(6);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(c.multiply(45, 2)).toBe(90);
  });

  test('division: 20 / 5 = 4', () => {
    expect(c.divide(20, 5)).toBe(4);
  });

  test('division by zero throws', () => {
    expect(() => c.divide(1, 0)).toThrow('Division by zero');
  });

  test('works with negative numbers', () => {
    expect(c.add(-2, 3)).toBe(1);
    expect(c.subtract(-5, -5)).toBe(0);
    expect(c.multiply(-3, 4)).toBe(-12);
    expect(c.divide(-10, 2)).toBe(-5);
  });

  test('works with floats (toBeCloseTo)', () => {
    expect(c.add(0.1, 0.2)).toBeCloseTo(0.3, 10);
  });

  // Extended operations
  test('modulo: 5 % 2 = 1', () => {
    expect(c.modulo(5, 2)).toBe(1);
  });

  test('modulo by zero throws', () => {
    expect(() => c.modulo(5, 0)).toThrow('Modulo by zero');
  });

  test('power: 2 ** 3 = 8', () => {
    expect(c.power(2, 3)).toBe(8);
    expect(c.power(5, 0)).toBe(1);
  });

  test('power with large exponent', () => {
    expect(c.power(2, 10)).toBe(1024);
  });

  test('squareRoot: sqrt(16) = 4', () => {
    expect(c.squareRoot(16)).toBe(4);
  });

  test('squareRoot of negative throws', () => {
    expect(() => c.squareRoot(-9)).toThrow('Square root of negative number');
  });
});
