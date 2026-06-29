// Settings dialog injection

const dialog_settings = document.createElement('dialog');
dialog_settings.id = 'whisker_dialog_settings';
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
if (whisker_topbar) { whisker_topbar.append(dialog_settings_trigger); }

// Transport AdvancedFormatting into dialog
const advanced_formatting = $q('#AdvancedFormatting');
advanced_formatting.classList.remove('drawer-content', 'closedDrawer');
dialog_settings.append(advanced_formatting);
