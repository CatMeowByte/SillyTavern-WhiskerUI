const { eventSource, event_types, getCurrentChatId, getThumbnailUrl } = SillyTavern.getContext();

const bar_chat = document.createElement('div');
bar_chat.id = 'whisker_bar_chat';

const bar_chat_avatar = document.createElement('div');
bar_chat_avatar.id = 'whisker_bar_chat_avatar';

const bar_chat_name = document.createElement('span');
bar_chat_name.id = 'whisker_bar_chat_name';

const bar_chat_subject = document.createElement('div');
bar_chat_subject.id = 'whisker_bar_chat_subject';
bar_chat_subject.append(bar_chat_avatar, bar_chat_name);
let char_original = null;
$on(bar_chat_subject, 'click', () => {
 char_original ??= $q('#setting_list > .interactable:has(> .fa-address-card)');
 char_original?.click();
});

const btn_world = document.createElement('a');
btn_world.classList.add('fa-solid', 'fa-book');
let world_original = null;
$on(btn_world, 'click', () => {
 world_original ??= $q('#setting_list .fa-book')?.parentElement;
 world_original?.click();
});

const [hidden_close_chat, btn_chat_close] = $qa('#option_close_chat');
hidden_close_chat?.remove();
btn_chat_close.innerHTML = '';
btn_chat_close.classList.add('fa-solid', 'fa-times');

const btn_options = $q('#options_button');
btn_options.classList.replace('fa-bars', 'fa-ellipsis-vertical');

bar_chat.append(btn_chat_close, bar_chat_subject, btn_world, btn_options);
$q('#sheld').insertBefore(bar_chat, $q('#chat'));

function update_bar_chat() {
 if (!getCurrentChatId()) { $set(bar_chat, 'display', 'none'); return; }
 const { groups, groupId, characters, characterId, name2 } = SillyTavern.getContext();

 // avatar
 const chars = [];
 if (groupId) {
  const group = groups.find(g => g.id === groupId);
  if (group?.members) {
   for (const m of group.members) {
    chars.push(characters.find(c => c.avatar === m || c.avatar_url === m));
   }
  }
 } else if (characterId) {
  chars.push(characters[characterId]);
 }

 bar_chat_avatar.innerHTML = '';
 for (const ch of chars) {
  const img = document.createElement('img');
  img.src = getThumbnailUrl('avatar', ch?.avatar) || ch?.avatar_url || '/img/five.png';
  bar_chat_avatar.appendChild(img);
 }

 // name
 bar_chat.style.removeProperty('display');
 bar_chat_name.textContent = groups.find(g => g.id === groupId)?.name
  || characters[characterId]?.name
  || name2
  || '';
}

update_bar_chat();
eventSource.on(event_types.CHAT_CHANGED, update_bar_chat);
eventSource.on(event_types.CHARACTER_EDITED, update_bar_chat);
eventSource.on(event_types.CHARACTER_DELETED, update_bar_chat);
eventSource.on(event_types.CHARACTER_RENAMED, update_bar_chat);
eventSource.on(event_types.GROUP_UPDATED, update_bar_chat);