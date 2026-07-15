// Settings dialog injection

const whisker_topbar = $q('#whisker_topbar');

const whisker_dialog_backdrop = document.createElement('div');
whisker_dialog_backdrop.className = 'whisker_dialog_backdrop';
whisker_dialog_backdrop.style.setProperty('display', 'none');
document.body.append(whisker_dialog_backdrop);

// ===================
// the popover things

const setting_list_popover = document.createElement('div');
setting_list_popover.id = 'setting_list';
setting_list_popover.popover = 'auto';
setting_list_popover.className = 'whisker_popup';
document.body.append(setting_list_popover);

const setting_list_button = document.createElement('button');
setting_list_button.setAttribute('popovertarget', setting_list_popover.id);
setting_list_button.className = 'fa-solid fa-bars';
whisker_topbar.append(setting_list_button);

const seting_list_popper = Popper.createPopper(setting_list_button, setting_list_popover, { placement: 'bottom-end' });
setting_list_popover.addEventListener('beforetoggle', (event) => { if (event.newState === 'open') { seting_list_popper.forceUpdate(); }
});

// popover items
// ==================

const setting_items = [
 ['Context', 'indent', '#left-nav-panel'],
 ['Connection', 'server', '#rm_api_block'],
 ['Formatting', 'marker', '#AdvancedFormatting'],
 ['Customization', 'palette', '#user-settings-block'],
 ['Background', 'panorama', '#Backgrounds'],
 ['Extension', 'puzzle-piece', '#rm_extensions_block'],
 ['Persona', 'user', '#PersonaManagement'],
 ['Character', 'address-card', '#right-nav-panel'],
 ['World', 'book', '#WorldInfo'],
];

for (const [label, icon, content_supplier] of setting_items) {
 const item_entry = document.createElement('a');
 item_entry.className = 'interactable';

 const item_icon = document.createElement('i');
 item_icon.className = `fa-solid fa-${icon}`;

 const item_label = document.createElement('span');
 item_label.textContent = label;

 const item_dialog = document.createElement('dialog');
 item_dialog.className = 'whisker_popup';
 whisker_dialog_backdrop.append(item_dialog);

 const dialog_header = document.createElement('div');
 dialog_header.className = 'whisker_dialog_header';

 const dialog_title = document.createElement('h2');
 dialog_title.textContent = label;

 const dialog_close = document.createElement('button');
 dialog_close.className = 'fa-solid fa-times';
 $on(dialog_close, 'click', (event) => { event.stopPropagation(); item_dialog.close(); });

 dialog_header.append(dialog_title, dialog_close);

 const dialog_wrap = document.createElement('div');
 dialog_wrap.className = 'whisker_dialog_scroll';

 const moved_element = $q(content_supplier);
 moved_element.className = 'whisker_popup_content';
 dialog_wrap.append(moved_element);

 item_dialog.append(dialog_header, dialog_wrap);

 item_entry.append(item_icon, item_label);

 $on(item_entry, 'click', () => {
  whisker_dialog_backdrop.style.removeProperty('display');
  for (const child of whisker_dialog_backdrop.children) {
   if (child !== item_dialog && child.open) child.close();
  }
  item_dialog.show();
 });

 item_dialog.addEventListener('close', () => {
  setTimeout(() => {
   if (!whisker_dialog_backdrop.querySelector('dialog[open]')) {
    whisker_dialog_backdrop.style.setProperty('display', 'none');
   }
  }, 0);
 });

 setting_list_popover.append(item_entry);
}

// delete the top bar

$q('#top-bar').remove()
$q('#top-settings-holder').remove()

// cleanup dialog header
$q('#clickSlidersTips').remove()
$q('.topRightInset').remove()
$q('[name="userSettingsRowOne"] > .flex-container:first-child').remove();
$q('#connection_profile_details_content').parentElement.remove();
$q('h3:has(> [data-i18n="Advanced Formatting"])').remove();
$q('h3:has(> [data-i18n="Backgrounds"])').remove();
$q('h3[data-i18n="Extensions"]').remove();
$q('.flex-container:has(> h3 > [data-i18n="Persona Management"])').remove();
$q('.flex-container:has(> h3 > [data-i18n="Worlds/Lorebooks"])').remove();
$q('#lm_button_panel_pin_div').remove();
$q('#rm_button_panel_pin_div').remove();

// world info HACK
const select_element = $q('#world_editor_select');
const row_wrapper = document.createElement('div');
row_wrapper.style.display = 'flex';
row_wrapper.style.flexBasis = '100%';
while (select_element.nextElementSibling) { row_wrapper.appendChild(select_element.nextElementSibling); }
select_element.parentNode.style.flexWrap = 'wrap';
select_element.parentNode.appendChild(row_wrapper);
