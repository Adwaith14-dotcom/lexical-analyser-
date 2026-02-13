const InputBuffer = require('./phase1-input-buffering');
const Scanner = require('./phase2-scanning');
console.log('\n========== EXAMPLE 1: Simple variable declaration ==========');
const code1 = `int x = 10;`;

const buffer1 = new InputBuffer(code1);
const scanner1 = new Scanner(buffer1);
const lexemes1 = scanner1.scan();
scanner1.printLexemes();

console.log('\n========== EXAMPLE 2: Multiple statements ==========');
const code2 = `int x = 10;
int y = 20;
int sum = x + y;`;

const buffer2 = new InputBuffer(code2);
const scanner2 = new Scanner(buffer2);
const lexemes2 = scanner2.scan();
scanner2.printLexemes();

console.log('\n========== EXAMPLE 3: If statement with operators ==========');
const code3 = `if (x > 5 && y < 10) {
    return x + y;
}`;

const buffer3 = new InputBuffer(code3);
const scanner3 = new Scanner(buffer3);
const lexemes3 = scanner3.scan();
scanner3.printLexemes();
console.log('\n========== EXAMPLE 4: Strings and characters ==========');
const code4 = `char c = 'A';
string name = "John";`;

const buffer4 = new InputBuffer(code4);
const scanner4 = new Scanner(buffer4);
const lexemes4 = scanner4.scan();
scanner4.printLexemes();

console.log('\n========== EXAMPLE 5: Floating point numbers ==========');
const code5 = `float pi = 3.14;
double e = 2.718e-1;`;

const buffer5 = new InputBuffer(code5);
const scanner5 = new Scanner(buffer5);
const lexemes5 = scanner5.scan();
scanner5.printLexemes();
console.log('\n========== EXAMPLE 6: Complex with comments ==========');
const code6 = `int main() {
  /* Calculate factorial */
  int n = 5;
  int result = n * (n - 1); // multiply
  return result;
}`;

const buffer6 = new InputBuffer(code6);
const scanner6 = new Scanner(buffer6);
const lexemes6 = scanner6.scan();
scanner6.printLexemes();
console.log('\n========== EXAMPLE 7: Multi-character operators ==========');
const code7 = `int x = 10;
x += 5;
if (x == 15) {
  y++;
}`;

const buffer7 = new InputBuffer(code7);
const scanner7 = new Scanner(buffer7);
const lexemes7 = scanner7.scan();
scanner7.printLexemes();