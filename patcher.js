const rule_replacer = new Map([
 ['#rightSendForm > div:not(.mes_stop), #leftSendForm > div', '#rightSendForm > div, #leftSendForm > div']
]);
const style_modifier = new Map([
 ['.neo-range-slider',
  {
   'background': 'none',
  }
 ]
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

const class_modifier = new Map([
 ['#wiTopBlock > .flex1.flex.alignSelfStart.range-block:nth-child(2)', { add: ['wide100p'] }],
 ['select', { remove: ['text_pole'] }],
]);

for (const [selector, ops] of class_modifier) {
 for (const el of document.querySelectorAll(selector)) {
  if (ops.add) { el.classList.add(...ops.add); }
  if (ops.remove) { el.classList.remove(...ops.remove); }
 }
}