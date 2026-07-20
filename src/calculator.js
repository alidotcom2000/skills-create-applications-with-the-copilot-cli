#!/usr/bin/env node
'use strict';

/*
CLI Calculator (src/calculator.js)

Supported operations:
- addition:       add, +
- subtraction:    sub, -
- multiplication: mul, *
- division:       div, /

Usage examples:
  node src/calculator.js add 2 3      # prints 5
  node src/calculator.js + 4 5        # prints 9
  node src/calculator.js div 6 0      # prints error to stderr and exits non-zero

This file exports the pure functions add, subtract, multiply, divide for testing.
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

// CLI behavior when invoked directly
if (require.main === module) {
  const args = process.argv.slice(2);

  const usage = `Usage: node src/calculator.js <op> <num1> <num2>\n
Supported ops: add (+), sub (-), mul (*), div (/).\nExamples:\n  node src/calculator.js add 2 3\n  node src/calculator.js / 10 2`;

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
};
