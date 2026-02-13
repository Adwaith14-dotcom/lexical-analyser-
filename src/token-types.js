const TokenTypes = {
  KEYWORD: 'KEYWORD',
  IDENTIFIER: 'IDENTIFIER',
  NUMBER: 'NUMBER',
  STRING: 'STRING',
  
  PLUS: 'PLUS',           
  MINUS: 'MINUS',         
  MULTIPLY: 'MULTIPLY',   
  DIVIDE: 'DIVIDE',       
  MODULO: 'MODULO',        
  ASSIGN: 'ASSIGN',       
  
  EQUAL: 'EQUAL',        
  NOT_EQUAL: 'NOT_EQUAL', 
  LESS_THAN: 'LESS_THAN',         
  GREATER_THAN: 'GREATER_THAN',   
  LESS_EQUAL: 'LESS_EQUAL',       
  GREATER_EQUAL: 'GREATER_EQUAL', 
  
  AND: 'AND',            
  OR: 'OR',               
  NOT: 'NOT',             
  
  LPAREN: 'LPAREN',    
  RPAREN: 'RPAREN',       
  LBRACE: 'LBRACE',      
  RBRACE: 'RBRACE',       
  LBRACKET: 'LBRACKET',  
  RBRACKET: 'RBRACKET',  
  SEMICOLON: 'SEMICOLON', 
  COMMA: 'COMMA',         
  DOT: 'DOT',             

  EOF: 'EOF',             
  NEWLINE: 'NEWLINE',     
  UNKNOWN: 'UNKNOWN'      
};
const KEYWORDS = {
  'int': TokenTypes.KEYWORD,
  'float': TokenTypes.KEYWORD,
  'double': TokenTypes.KEYWORD,
  'char': TokenTypes.KEYWORD,
  'void': TokenTypes.KEYWORD,
  'if': TokenTypes.KEYWORD,
  'else': TokenTypes.KEYWORD,
  'while': TokenTypes.KEYWORD,
  'for': TokenTypes.KEYWORD,
  'do': TokenTypes.KEYWORD,
  'return': TokenTypes.KEYWORD,
  'break': TokenTypes.KEYWORD,
  'continue': TokenTypes.KEYWORD,
  'switch': TokenTypes.KEYWORD,
  'case': TokenTypes.KEYWORD,
  'default': TokenTypes.KEYWORD,
  'true': TokenTypes.KEYWORD,
  'false': TokenTypes.KEYWORD,
  'null': TokenTypes.KEYWORD,
  'const': TokenTypes.KEYWORD,
  'static': TokenTypes.KEYWORD,
};

module.exports = { TokenTypes, KEYWORDS };