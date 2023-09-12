const css = `
  .my-class {
    color: red;
    font-size: 16px;
    background-color: #eee;
  }
`;

function cssToJs(css) {
  const styles = {};
  const lines = css.split('\n').filter(line => line.trim() !== '');

  lines.forEach(line => {
    const [selector, declarations] = line.split('{');
    console.log(selector, declarations)
    const properties = declarations.split(';').filter(declaration => declaration.trim() !== '');

    const selectorName = selector.trim();
    const declarationsObj = {};

    properties.forEach(property => {
      const [propertyKey, propertyValue] = property.split(':');
      declarationsObj[propertyKey.trim()] = propertyValue.trim();
    });

    styles[selectorName] = declarationsObj;
  });

  return styles;
}

const jsStyles = cssToJs(css);
console.log(jsStyles);
