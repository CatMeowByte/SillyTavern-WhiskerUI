import './util.js';

import './patcher.js';

const path_base = '/scripts/extensions/SillyTavern-WhiskerUI';

const style_file = [
 '/interface/select.css',
 '/interface/slider.css',
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

import './setting.js';
import './topbar.js';
import './textbar.js';
