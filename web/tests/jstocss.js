const styles = {
    '.my-class': {
      color: 'red',
      fontSize: '16px',
      backgroundColor: '#eee'
    },
    '.another-class': {
      color: 'blue',
      fontWeight: 'bold'
    }
  };
  
  function jsToCss(styles) {
    let css = '';
    for (const selector in styles) {
      css += `${selector} {\n`;
      const declarations = styles[selector];
      for (const property in declarations) {
        css += `  ${property}: ${declarations[property]};\n`;
      }
      css += '}\n';
    }
    return css;
  }
  
  const cssString = jsToCss(styles);
  console.log(cssString);
  