import './util.js';

import './patcher.js';

import './slash.js';

import './interface/bar_top.js';
import './interface/bar_text.js';
import './interface/settings.js';
import './interface/slider.js';

// declare we are the one in control of ui
// also to make specificity higher
document.body.id = 'whisker_body';