class Token {
  constructor(type, lexeme, literal, line, column) {
    this.type = type;          
    this.lexeme = lexeme;      
    this.literal = literal;     
    this.line = line;           
    this.column = column;      
  }

  toString() {
    return `Token(${this.type}, "${this.lexeme}", ${this.literal}, ${this.line}:${this.column})`;
  }

  toJSON() {
    return {
      type: this.type,
      lexeme: this.lexeme,
      literal: this.literal,
      line: this.line,
      column: this.column
    };
  }
}

module.exports = Token;