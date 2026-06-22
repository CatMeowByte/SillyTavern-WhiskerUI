const rule_replacer = new Map([
 ['#rightSendForm > div:not(.mes_stop), #leftSendForm > div', '#rightSendForm > div, #leftSendForm > div']
]);
const style_modifier = new Map([
 // ['#rightSendForm > div, #leftSendForm > div',
 //  {
 //   'display': 'flex',
 //   'align-items': 'center',
 //  }
 // ]
]);

for (let sheet of document.styleSheets) {
 try {
  for (let rule of sheet.cssRules) {
   let after = rule_replacer.get(rule.selectorText);
   if (after) { rule.selectorText = after; }
   let props = style_modifier.get(rule.selectorText);
   if (props) { for (let prop in props) { rule.style[prop] = props[prop]; } }
  }
 }
 catch (e) {}
}
