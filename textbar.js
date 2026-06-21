const { getCurrentChatId, renameChat, eventSource, event_types, Popup } = SillyTavern.getContext();

const btn_attach = $q('#attachFile');
$q('span', btn_attach)?.remove();
$q('#leftSendForm').append(btn_attach);

$q('#mes_stop i').classList.replace('fa-circle-stop', 'fa-stop');
