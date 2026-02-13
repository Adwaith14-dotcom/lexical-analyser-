const InputBuffer = require('./phase1-input-buffering');

console.log('\n========== EXAMPLE 1: Code without comments ==========');
const code1 = `int x = 10;
int y = 20;`;

const buffer1 = new InputBuffer(code1);
console.log('Original Source:');
console.log(code1);
console.log('\nCleaned Source:');
console.log(buffer1.getCleanedSource());

console.log('\n========== EXAMPLE 2: Code with single-line comments ==========');
const code2 = `int x = 10;  // This is x
int y = 20;  // This is y`;

const buffer2 = new InputBuffer(code2);
console.log('Original Source:');
console.log(code2);
console.log('\nCleaned Source:');
console.log(buffer2.getCleanedSource());

console.log('\n========== EXAMPLE 3: Code with multi-line comments ==========');
const code3 = `/* This is a
   multi-line comment */
int x = 10;
/* Another comment */
int y = 20;`;

const buffer3 = new InputBuffer(code3);
console.log('Original Source:');
console.log(code3);
console.log('\nCleaned Source:');
console.log(buffer3.getCleanedSource());

console.log('\n========== EXAMPLE 4: Peek and Consume ==========');
const code4 = 'int x;';
const buffer4 = new InputBuffer(code4);

console.log('Testing peek and consume:');
console.log('Peek:', buffer4.peek());        
console.log('Consume:', buffer4.consume()); 
console.log('Peek:', buffer4.peek());        
console.log('Current Position:', buffer4.getCurrentPosition());

console.log('\n========== EXAMPLE 5: Complex code with mixed comments ==========');
const code5 = `// Header comment
int main() {
  /* Variable declaration */
  int x = 10;  // x value
  int y = 20;  // y value
  
  /* Calculate sum */
  int sum = x + y; // sum result
  
  return sum;
}`;

const buffer5 = new InputBuffer(code5);
console.log('Original Source:');
console.log(code5);
console.log('\nCleaned Source:');
console.log(buffer5.getCleanedSource());
console.log('Lines:', buffer5.line);