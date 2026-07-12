const rule_remover = new Set([
 'body.hideChatAvatars .last_mes:not(.smallSysMes)',
]);

for (const sheet of document.styleSheets) {
 try {
  for (let i = sheet.cssRules.length - 1; i >= 0; i--) {
   if (rule_remover.has(sheet.cssRules[i].selectorText)) { sheet.deleteRule(i); }
  }
 } catch (e) {}
}


const rule_replacer = new Map([
 ['#rightSendForm > div:not(.mes_stop), #leftSendForm > div', '#rightSendForm > div, #leftSendForm > div'],
]);

const style_modifier = new Map([
 ['.neo-range-slider', { 'background': 'none', }],
 ['.avatar img', { 'border': 'none', 'box-shadow': 'unset'}],
 ['#character_popup', { 'z-index': '4005'}],

 // toggle dependent
 ['body.hideChatAvatars .last_mes:not(.smallSysMes)', { 'padding-bottom': 'inherit'}],
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
 ['#top-settings-holder .drawer-content', { remove: ['fillRight', 'fillLeft'] }],
 ['#wiTopBlock > .flex1.flex.alignSelfStart.range-block:nth-child(2)', { add: ['wide100p'] }],
 ['select', { remove: ['text_pole'] }],
]);

for (const [selector, ops] of class_modifier) {
 for (const el of document.querySelectorAll(selector)) {
  if (ops.add) { el.classList.add(...ops.add); }
  if (ops.remove) { el.classList.remove(...ops.remove); }
 }
}