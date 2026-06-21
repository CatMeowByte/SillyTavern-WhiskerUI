const { getCurrentChatId, renameChat, eventSource, event_types, Popup } = SillyTavern.getContext();

const sheld = $q('#sheld');
const chat = $q('#chat');

const bar_top = document.createElement('div');
bar_top.id = 'whisker_topbar';

const chat_name = document.createElement('div');
chat_name.className = 'chat_name';

const btn_new_chat = $q('#option_start_new_chat');
$q('span', btn_new_chat)?.remove();
$q('i', btn_new_chat)?.classList.replace('fa-comments', 'fa-plus');

const btn_close_chat = document.createElement('i');
btn_close_chat.className = 'fa-solid fa-times';
btn_close_chat.title = 'Close chat';

const btn_options = $q('#options_button');

const btn_extensions = $q('#extensionsMenuButton');
btn_extensions.classList.replace('fa-magic-wand-sparkles', 'fa-wrench');

bar_top.append(btn_new_chat, chat_name, btn_extensions, btn_options, btn_close_chat);
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

$on(btn_close_chat, 'click', () => {
 $q('#option_close_chat')?.click();
});

update_chat_name();
eventSource.on(event_types.CHAT_CHANGED, update_chat_name);
