const range_inputs = $qa('input[type="range"]');

for (const input of range_inputs) {
 const value_set = () => { input.style.setProperty('--range_value', `${(input.value - input.min) / (input.max - input.min) * 100}%`); };
 input.addEventListener('input', value_set);
 value_set();
}