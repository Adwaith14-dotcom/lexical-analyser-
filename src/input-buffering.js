class InputBuffer {
  constructor(sourceCode) {
    this.originalSource = sourceCode;
    
    this.cleanedSource = '';
    
    this.position = 0;
    
    this.line = 1;
    this.column = 1;
    
    this.charPositions = [];
    
    this.initializeBuffer();
  }

  initializeBuffer() {
    console.log('Input Buffering & Preprocessing Started');
    
    this.removeComments();
    
    this.buildCharPositionMap();
    
    console.log(' Input Buffering & Preprocessing Complete');
    console.log(`   Total characters: ${this.cleanedSource.length}`);
    console.log(`   Total lines: ${this.line}`);
  }
  removeComments() {
    let result = '';
    let i = 0;
    let line = 1;
    let column = 1;

    while (i < this.originalSource.length) {
      if (i < this.originalSource.length - 1 && 
          this.originalSource[i] === '/' && 
          this.originalSource[i + 1] === '/') {
        
        while (i < this.originalSource.length && this.originalSource[i] !== '\n') {
          i++;
        }
        if (i < this.originalSource.length && this.originalSource[i] === '\n') {
          result += '\n';
          line++;
          column = 1;
          i++;
        }
        continue;
      }
      if (i < this.originalSource.length - 1 && 
          this.originalSource[i] === '/' && 
          this.originalSource[i + 1] === '*') {
        
        // Skip until */
        i += 2;
        while (i < this.originalSource.length - 1) {
          if (this.originalSource[i] === '*' && this.originalSource[i + 1] === '/') {
            i += 2;
            break;
          }
          if (this.originalSource[i] === '\n') {
            line++;
            column = 1;
          } else {
            column++;
          }
          i++;
        }
        continue;
      }
      result += this.originalSource[i];
      
      if (this.originalSource[i] === '\n') {
        line++;
        column = 1;
      } else {
        column++;
      }
      
      i++;
    }

    this.cleanedSource = result;
  }
  buildCharPositionMap() {
    let line = 1;
    let column = 1;

    for (let i = 0; i < this.cleanedSource.length; i++) {
      this.charPositions.push({ line, column });

      if (this.cleanedSource[i] === '\n') {
        line++;
        column = 1;
      } else {
        column++;
      }
    }

    this.line = line;
    this.column = column;
  }
  peek(offset = 0) {
    const index = this.position + offset;
    if (index < this.cleanedSource.length) {
      return this.cleanedSource[index];
    }
    return null; 
  }
  consume() {
    if (this.position < this.cleanedSource.length) {
      const char = this.cleanedSource[this.position];
      this.position++;
      
      if (char === '\n') {
        this.line++;
        this.column = 1;
      } else {
        this.column++;
      }
      
      return char;
    }
    return null; 
  }
  isEOF() {
    return this.position >= this.cleanedSource.length;
  }
  getCurrentPosition() {
    return {
      line: this.line,
      column: this.column,
      position: this.position
    };
  }
  reset() {
    this.position = 0;
    this.line = 1;
    this.column = 1;
  }
  substring(start, end) {
    return this.cleanedSource.substring(start, end);
  }
  getCleanedSource() {
    return this.cleanedSource;
  }
  getOriginalSource() {
    return this.originalSource;
  }
}

module.exports = InputBuffer;