// Settings dialog injection

const whisker_topbar = $q('#whisker_topbar');

// ===================
// the popover things

const setting_list_popover = document.createElement('div');
setting_list_popover.id = 'setting_list';
setting_list_popover.popover = 'auto';
setting_list_popover.className = 'whisker_popup';
document.body.append(setting_list_popover);

const setting_list_button = document.createElement('button');
setting_list_button.setAttribute('popovertarget', setting_list_popover.id);
setting_list_button.className = 'fa-solid fa-screwdriver-wrench';
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

 const dialog_header = document.createElement('div');
 dialog_header.className = 'whisker_dialog_header';

 const dialog_title = document.createElement('h2');
 dialog_title.textContent = label;

 const dialog_close = document.createElement('button');
 dialog_close.className = 'fa-solid fa-times';
 $on(dialog_close, 'click', (event) => { event.stopPropagation(); item_dialog.close(); });

 dialog_header.append(dialog_title, dialog_close);
 item_dialog.append(dialog_header);

 const moved_element = $q(content_supplier);
 moved_element?.classList.remove('drawer-content', 'closedDrawer');
 item_dialog.append(moved_element);


 item_entry.append(item_icon, item_label, item_dialog);
 $on(item_entry, 'click', () => { item_dialog.showModal(); });

 setting_list_popover.append(item_entry);
}

// delete the top bar

$q('#top-bar').remove()
$q('#top-settings-holder').remove()

