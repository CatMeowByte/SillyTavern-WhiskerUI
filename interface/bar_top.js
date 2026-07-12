const { getCurrentChatId, renameChat, eventSource, event_types, Popup } = SillyTavern.getContext();

const sheld = $q('#sheld');
const chat = $q('#chat');

const bar_top = document.createElement('div');
bar_top.id = 'whisker_topbar';

const chat_name = document.createElement('div');
chat_name.className = 'chat_name';

const btn_new_chat = $q('#option_start_new_chat');
btn_new_chat.innerHTML = '';
btn_new_chat.classList.add('fa-solid', 'fa-plus');

const [hidden_close_chat, visible_close_chat] = $qa('#option_close_chat');
hidden_close_chat?.remove();
visible_close_chat.innerHTML = '';
visible_close_chat.classList.add('fa-solid', 'fa-times');

const btn_options = $q('#options_button');
btn_options.classList.replace('fa-bars', 'fa-ellipsis-vertical');

const btn_extensions = $q('#extensionsMenuButton');
btn_extensions.classList.replace('fa-magic-wand-sparkles', 'fa-wrench');

bar_top.append(visible_close_chat, btn_new_chat, chat_name, btn_extensions, btn_options);
sheld.insertBefore(bar_top, chat);

function update_chat_name() {
 const name = getCurrentChatId();
 chat_name.setAttribute('aria-disabled', name ? 'false' : 'true');
 chat_name.textContent = name || 'No chat selected';
}

$on(chat_name, 'click', async () => {
 if (chat_name.getAttribute('aria-disabled') === 'true') return;

 const current_name = getCurrentChatId();
 if (!current_name) return;
 const new_name = await Popup.show.input('Enter new chat name', null, current_name);
 if (new_name && new_name !== current_name) await renameChat(current_name, String(new_name));
});

update_chat_name();
eventSource.on(event_types.CHAT_CHANGED, update_chat_name);
