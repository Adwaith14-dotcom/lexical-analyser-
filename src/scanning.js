class Scanner {
  constructor(inputBuffer) {
    this.inputBuffer = inputBuffer;
    this.lexemes = [];         
    this.currentLexeme = '';   
    this.lexemeStartLine = 1;
    this.lexemeStartColumn = 1;
  }
  scan() {
    console.log('\n Scanning Started');
    
    this.lexemes = [];
    this.inputBuffer.reset();

    while (!this.inputBuffer.isEOF()) {
      const char = this.inputBuffer.peek();
      if (this.isWhitespace(char)) {
        this.inputBuffer.consume();
        continue;
      }
      this.extractLexeme();
    }

    console.log(' Scanning Complete');
    console.log(`   Total lexemes found: ${this.lexemes.length}`);
    
    return this.lexemes;
  }
  extractLexeme() {
    const startPos = this.inputBuffer.getCurrentPosition();
    const char = this.inputBuffer.peek();
    this.lexemeStartLine = startPos.line;
    this.lexemeStartColumn = startPos.column;
    this.currentLexeme = '';
    if (this.isDigit(char)) {
      this.scanNumber();
    }
    else if (this.isLetter(char) || char === '_') {
      this.scanIdentifier();
    }
    else if (char === '"') {
      this.scanString();
    }
    else if (char === "'") {
      this.scanCharacter();
    }
    else if (this.isOperatorStart(char)) {
      this.scanOperator();
    }
    else if (this.isDelimiter(char)) {
      this.currentLexeme = this.inputBuffer.consume();
      this.addLexeme(this.currentLexeme);
    }
    else {
      this.currentLexeme = this.inputBuffer.consume();
      this.addLexeme(this.currentLexeme); 
    }
  }
  scanNumber() {
    while (!this.inputBuffer.isEOF() && this.isDigit(this.inputBuffer.peek())) {
      this.currentLexeme += this.inputBuffer.consume();
    }
    if (this.inputBuffer.peek() === '.' && 
        this.isDigit(this.inputBuffer.peek(1))) {
      this.currentLexeme += this.inputBuffer.consume(); 
      
      while (!this.inputBuffer.isEOF() && this.isDigit(this.inputBuffer.peek())) {
        this.currentLexeme += this.inputBuffer.consume();
      }
    }

    if ((this.inputBuffer.peek() === 'e' || this.inputBuffer.peek() === 'E') &&
        (this.isDigit(this.inputBuffer.peek(1)) || 
         ((this.inputBuffer.peek(1) === '+' || this.inputBuffer.peek(1) === '-') &&
          this.isDigit(this.inputBuffer.peek(2))))) {
      
      this.currentLexeme += this.inputBuffer.consume(); 
      
      if (this.inputBuffer.peek() === '+' || this.inputBuffer.peek() === '-') {
        this.currentLexeme += this.inputBuffer.consume();
      }
      
      while (!this.inputBuffer.isEOF() && this.isDigit(this.inputBuffer.peek())) {
        this.currentLexeme += this.inputBuffer.consume();
      }
    }

    this.addLexeme(this.currentLexeme);
  }
  scanIdentifier() {
    while (!this.inputBuffer.isEOF() && 
           (this.isLetter(this.inputBuffer.peek()) || 
            this.isDigit(this.inputBuffer.peek()) || 
            this.inputBuffer.peek() === '_')) {
      this.currentLexeme += this.inputBuffer.consume();
    }

    this.addLexeme(this.currentLexeme);
  }
  scanString() {
    this.currentLexeme += this.inputBuffer.consume(); 

    while (!this.inputBuffer.isEOF() && this.inputBuffer.peek() !== '"') {
      if (this.inputBuffer.peek() === '\\') {
        this.currentLexeme += this.inputBuffer.consume();
        if (!this.inputBuffer.isEOF()) {
          this.currentLexeme += this.inputBuffer.consume();
        }
      } else {
        this.currentLexeme += this.inputBuffer.consume();
      }
    }

    if (!this.inputBuffer.isEOF()) {
      this.currentLexeme += this.inputBuffer.consume(); 
    }

    this.addLexeme(this.currentLexeme);
  }
  scanCharacter() {
    this.currentLexeme += this.inputBuffer.consume(); 

    while (!this.inputBuffer.isEOF() && this.inputBuffer.peek() !== "'") {
      if (this.inputBuffer.peek() === '\\') {
        this.currentLexeme += this.inputBuffer.consume();
        if (!this.inputBuffer.isEOF()) {
          this.currentLexeme += this.inputBuffer.consume();
        }
      } else {
        this.currentLexeme += this.inputBuffer.consume();
      }
    }
    if (!this.inputBuffer.isEOF()) {
      this.currentLexeme += this.inputBuffer.consume(); 
    }

    this.addLexeme(this.currentLexeme);
  }

  scanOperator() {
    const char = this.inputBuffer.peek();
    const nextChar = this.inputBuffer.peek(1);

    if (char === '=' && nextChar === '=') {
      this.currentLexeme = this.inputBuffer.consume() + this.inputBuffer.consume();
    } else if (char === '!' && nextChar === '=') {
      this.currentLexeme = this.inputBuffer.consume() + this.inputBuffer.consume();
    } else if (char === '<' && nextChar === '=') {
      this.currentLexeme = this.inputBuffer.consume() + this.inputBuffer.consume();
    } else if (char === '>' && nextChar === '=') {
      this.currentLexeme = this.inputBuffer.consume() + this.inputBuffer.consume();
    } else if (char === '&' && nextChar === '&') {
      this.currentLexeme = this.inputBuffer.consume() + this.inputBuffer.consume();
    } else if (char === '|' && nextChar === '|') {
      this.currentLexeme = this.inputBuffer.consume() + this.inputBuffer.consume();
    } else if (char === '+' && nextChar === '+') {
      this.currentLexeme = this.inputBuffer.consume() + this.inputBuffer.consume();
    } else if (char === '-' && nextChar === '-') {
      this.currentLexeme = this.inputBuffer.consume() + this.inputBuffer.consume();
    } else if (char === '+' && nextChar === '=') {
      this.currentLexeme = this.inputBuffer.consume() + this.inputBuffer.consume();
    } else if (char === '-' && nextChar === '=') {
      this.currentLexeme = this.inputBuffer.consume() + this.inputBuffer.consume();
    } else if (char === '*' && nextChar === '=') {
      this.currentLexeme = this.inputBuffer.consume() + this.inputBuffer.consume();
    } else if (char === '/' && nextChar === '=') {
      this.currentLexeme = this.inputBuffer.consume() + this.inputBuffer.consume();
    } else {
      this.currentLexeme = this.inputBuffer.consume();
    }

    this.addLexeme(this.currentLexeme);
  }
  addLexeme(lexeme) {
    if (lexeme.length > 0) {
      this.lexemes.push({
        lexeme: lexeme,
        line: this.lexemeStartLine,
        column: this.lexemeStartColumn
      });
    }
  }
  isWhitespace(char) {
    return char === ' ' || char === '\t' || char === '\n' || char === '\r';
  }
  isDigit(char) {
    return char !== null && char >= '0' && char <= '9';
  }
  isLetter(char) {
    return char !== null && 
           ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z'));
  }
  isOperatorStart(char) {
    return char === '+' || char === '-' || char === '*' || char === '/' || 
           char === '%' || char === '=' || char === '!' || char === '<' || 
           char === '>' || char === '&' || char === '|';
  }
  isDelimiter(char) {
    return char === '(' || char === ')' || char === '{' || char === '}' || 
           char === '[' || char === ']' || char === ';' || char === ',' || 
           char === '.';
  }
  getLexemes() {
    return this.lexemes;
  }
  printLexemes() {
    console.log('\n📋 Extracted Lexemes:');
    console.log('─'.repeat(60));
    this.lexemes.forEach((lex, index) => {
      console.log(`${index + 1}. "${lex.lexeme}" (Line: ${lex.line}, Column: ${lex.column})`);
    });
    console.log('─'.repeat(60));
  }
}

module.exports = Scanner;