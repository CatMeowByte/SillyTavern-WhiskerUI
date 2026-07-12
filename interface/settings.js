// Settings dialog injection

const dialog_settings = document.createElement('dialog');
dialog_settings.id = 'whisker_dialog_settings';
dialog_settings.className = 'whisker_popup';
document.body.append(dialog_settings);

const dialog_settings_header = document.createElement('div');
dialog_settings_header.className = 'whisker_dialog_header';

const dialog_settings_title = document.createElement('h2');
dialog_settings_title.textContent = 'Settings';

const dialog_settings_close = document.createElement('button');
dialog_settings_close.className = 'fa-solid fa-times';
$on(dialog_settings_close, 'click', () => { dialog_settings.close(); });

dialog_settings_header.append(dialog_settings_title, dialog_settings_close);
dialog_settings.append(dialog_settings_header);

// Trigger button in topbar
const dialog_settings_trigger = document.createElement('a');
dialog_settings_trigger.className = 'fa-solid fa-gear interactable';
dialog_settings_trigger.title = 'Settings';
dialog_settings_trigger.tabIndex = 0;
$on(dialog_settings_trigger, 'click', () => { dialog_settings.showModal(); });

const whisker_topbar = $q('#whisker_topbar');
whisker_topbar.append(dialog_settings_trigger);

// Transport AdvancedFormatting into dialog
const advanced_formatting = $q('#AdvancedFormatting');
advanced_formatting.classList.remove('drawer-content', 'closedDrawer');
dialog_settings.append(advanced_formatting);

// ===================
// the popover things

const setting_list_popover = document.createElement('div');
setting_list_popover.id = 'setting_list';
setting_list_popover.popover = 'auto';
setting_list_popover.textContent = 'Whatever you want inside!';
setting_list_popover.className = 'whisker_popup';
document.body.append(setting_list_popover);

const setting_list_button = document.createElement('button');
setting_list_button.setAttribute('popovertarget', setting_list_popover.id);
setting_list_button.className = 'fa-solid fa-screwdriver-wrench';
whisker_topbar.append(setting_list_button);

const seting_list_popper = Popper.createPopper(setting_list_button, setting_list_popover, { placement: 'bottom-end' });
setting_list_popover.addEventListener('beforetoggle', (event) => { if (event.newState === 'open') { seting_list_popper.forceUpdate(); }
});