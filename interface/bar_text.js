const { eventSource, event_types } = SillyTavern.getContext();

const persona_subject = document.createElement('div');
persona_subject.id = 'whisker_persona_subject';

const persona_avatar = document.createElement('div');
persona_avatar.id = 'whisker_persona_avatar';
const persona_img = document.createElement('img');
persona_avatar.appendChild(persona_img);

const persona_name = document.createElement('span');
persona_name.id = 'whisker_persona_name';

persona_subject.append(persona_avatar, persona_name);

const btn_attach = $q('#attachFile');
$set(btn_attach, 'padding', '0.5rem');
$q('span', btn_attach).remove();
$q('#leftSendForm').append(btn_attach);
$q('#nonQRFormItems').append(persona_subject);

const btn_stop = $q('#mes_stop');
btn_stop.classList.add('fa-solid', 'fa-stop', 'interactable');
btn_stop.innerHTML = '';

$on(persona_subject, 'click', () => {
 $q('#setting_list > .interactable:has(> .fa-user)').click();
});

function update_persona() {
 const { name1, powerUserSettings, getThumbnailUrl } = SillyTavern.getContext();
 persona_name.textContent = name1;
 const persona_id = $q('#user_avatar_block .avatar-container.selected[data-avatar-id]')?.dataset.avatarId || powerUserSettings.default_persona;
 persona_img.src = persona_id ? getThumbnailUrl('persona', persona_id) : '/img/ai4.png';
}

eventSource.on(event_types.CHAT_CHANGED, update_persona);
eventSource.on(event_types.SETTINGS_UPDATED, update_persona);
update_persona();