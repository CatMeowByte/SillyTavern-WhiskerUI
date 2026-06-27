import './util.js';

import './patcher.js';

const path_base = '/scripts/extensions/SillyTavern-WhiskerUI';

const style_file = [
 '/interface/message.css',
 '/interface/select.css',
 '/interface/slider.css',
 '/interface/swipe.css',
 '/interface/input_number.css',
 '/interface/bar_text.css',
 '/interface/bar_top.css',
];

for (const file of style_file) {
 const link_file = document.createElement('link');
 link_file.rel = 'stylesheet';
 link_file.type = 'text/css';
 link_file.href = path_base + file;
 document.head.appendChild(link_file);
}

import './interface/bar_top.js';
import './interface/bar_text.js';
