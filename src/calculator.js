#!/usr/bin/env node
'use strict';

/*
CLI Calculator (src/calculator.js)

Supported operations:
- addition:       add, +
- subtraction:    sub, -
- multiplication: mul, *
- division:       div, /
- modulo:         mod, %
- exponentiation: pow, power, **
- square root:    sqrt (unary)

Usage examples:
  node src/calculator.js add 2 3      # prints 5
  node src/calculator.js + 4 5        # prints 9
  node src/calculator.js div 6 0      # prints error to stderr and exits non-zero
  node src/calculator.js mod 10 3     # prints 1
  node src/calculator.js pow 2 8      # prints 256
  node src/calculator.js sqrt 9       # prints 3

This file exports the pure functions add, subtract, multiply, divide, modulo, power, squareRoot for testing.
*/

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

function modulo(a, b) {
  if (b === 0) {
    throw new Error('Modulo by zero');
  }
  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error('Square root of negative number');
  }
  return Math.sqrt(n);
}

// CLI behavior when invoked directly
if (require.main === module) {
  const args = process.argv.slice(2);

  const usage = `Usage:\n  node src/calculator.js <op> <num1> <num2>\n  node src/calculator.js sqrt <num>\n\nSupported ops: add (+), sub (-), mul (*), div (/), mod (%), pow (power, **), sqrt (unary)\nExamples:\n  node src/calculator.js add 2 3\n  node src/calculator.js % 10 3\n  node src/calculator.js pow 2 8\n  node src/calculator.js sqrt 9`;

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(usage);
    process.exit(0);
  }

  if (args.length !== 3) {
    console.error('Error: expected exactly 3 arguments.');
    console.error(usage);
    process.exit(1);
  }

  const [opRaw, aRaw, bRaw] = args;
  const op = opRaw.toLowerCase();

  // Handle unary operation: sqrt
  if (op === 'sqrt') {
    if (args.length !== 2) {
      console.error('Error: sqrt expects one operand.');
      console.error(usage);
      process.exit(1);
    }
    const n = Number(aRaw);
    if (!Number.isFinite(n)) {
      console.error('Error: operand must be a valid number.');
      process.exit(1);
    }
    try {
      const result = squareRoot(n);
      console.log(result);
      process.exit(0);
    } catch (err) {
      console.error('Error:', err.message);
      process.exit(2);
    }
  }

  // Binary operations
  if (args.length !== 3) {
    console.error('Error: expected exactly 3 arguments for binary operations.');
    console.error(usage);
    process.exit(1);
  }

  const a = Number(aRaw);
  const b = Number(bRaw);

  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    console.error('Error: both operands must be valid numbers.');
    process.exit(1);
  }

  const ops = {
    add: add,
    '+': add,
    sub: subtract,
    '-': subtract,
    mul: multiply,
    '*': multiply,
    div: divide,
    '/': divide,
    mod: modulo,
    '%': modulo,
    pow: power,
    power: power,
    '**': power,
  };

  const fn = ops[op];
  if (typeof fn !== 'function') {
    console.error(`Error: unsupported operation '${opRaw}'.`);
    console.error(usage);
    process.exit(1);
  }

  try {
    const result = fn(a, b);
    // Print numeric result to stdout
    console.log(result);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    // Non-zero exit code for errors (e.g., divide-by-zero)
    process.exit(2);
  }
}

// Export functions for testing
module.exports = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
};
