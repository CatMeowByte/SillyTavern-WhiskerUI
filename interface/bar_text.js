const btn_attach = $q('#attachFile');
$q('span', btn_attach)?.remove();
$q('#leftSendForm').append(btn_attach);

const btn_stop = $q('#mes_stop');
btn_stop.classList.add('fa-solid', 'fa-stop', 'interactable');
btn_stop.innerHTML = '';
