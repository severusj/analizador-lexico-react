import React, { useState } from 'react';
import { Container, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import MonacoEditor from 'react-monaco-editor';
import './Lexer.css';

function Lexer() {
  const [sourceCode, setSourceCode] = useState('');
  const [tokens, setTokens] = useState([]);

  const analyzeSourceCode = () => {
    const keywords = ['if', 'else', 'for', 'print', 'int'];
    const operators = ['+', '-', '*', '/', ':=', '>=', '<=', '>', '<', '=', '<>', '{', '}', '[', ']', '(', ')', ',', ';', '..'];
    const sourceLines = sourceCode.split('\n');
  
    const extractTokens = (line) => {
      const words = line.split(/\s+/);
      let extractedTokens = [];
  
      words.forEach(word => {
        if (word === '') return;
  
        if (word.toLowerCase() === 'if') {
          extractedTokens.push('Palabra reservada if');
        } else if (word.toLowerCase() === 'true') {
          extractedTokens.push('Constante booleana true');
        } else if (word.toLowerCase() === 'false') {
          extractedTokens.push('Constante booleana false');
        } else if (keywords.includes(word.toLowerCase())) {
          extractedTokens.push(`Palabra reservada ${word}`);
        } else if (operators.includes(word)) {
          extractedTokens.push(`Operador ${word}`);
        } else if (/^[a-zA-Z][a-zA-Z0-9]{0,14}$/.test(word)) {
          extractedTokens.push(`Identificador ${word}`);
        } else if (/^\d+$/.test(word) && parseInt(word) >= 0 && parseInt(word) <= 100) {
          extractedTokens.push(`Constante entera ${word}`);
        } else if (/^[bfhjk]+$/.test(word)) {
          extractedTokens.push(`Constante correspondiente a ${word}`);
        } else if (word.startsWith('"') && word.endsWith('"')) {
          extractedTokens.push(`Cadena de caracteres ${word}`);
        } else {
          extractedTokens.push(`Error: Token no reconocido - ${word}`);
        }
      });
  
      return extractedTokens;
    };
  
    let allTokens = [];
    sourceLines.forEach(line => {
      const lineTokens = extractTokens(line);
      allTokens = [...allTokens, ...lineTokens];
    });
  
    setTokens(allTokens);
  };
  
  return (
    <Container className="lexer-container">
      <Typography variant="h4" gutterBottom>Analizador Léxico</Typography>
      <div className="input-area">
      <MonacoEditor
        width="100%"
        height="300"
        language="plaintext"
        theme="vs-dark"
        value={sourceCode}
        onChange={(value) => setSourceCode(value)}
        options={{
            minimap: { enabled: false },
        }}
    />
        <br></br>
        <Button variant="contained" color="primary" onClick={analyzeSourceCode}>Analizar</Button>
      </div>
      <hr />
      <div className="tokens-area">
        <Typography variant="h5" gutterBottom>Tokens Detectados:</Typography>
        <List>
          {tokens.map((token, index) => (
            <ListItem key={index}>
              <ListItemText primary={token} />
            </ListItem>
          ))}
        </List>
      </div>
    </Container>
  );
}

export default Lexer;
