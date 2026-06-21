// globalThis.$ = id => document.getElementById(id); // NOTICE: SillyTavern already use JQuary
globalThis.$q = (sel, ctx = document) => ctx.querySelector(sel);
globalThis.$qa = (sel, ctx = document) => ctx.querySelectorAll(sel);
globalThis.$on = (el, evt, fn, opt) => el.addEventListener(evt, fn, opt);
globalThis.$set = (el, key, val) => el.style.setProperty(key, val);
