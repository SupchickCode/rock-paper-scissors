const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'));
const popoverList = popoverTriggerList.map(function(popoverTrigger) {
    return new bootstrap.Popover(popoverTrigger);
});

const inviteButton = document.querySelector('.invite-friend__button');
inviteButton.addEventListener("pointerdown", () => navigator.clipboard.writeText(inviteButton.value));

function showModal(msg = '', modalId = 'result-output') {
    const modalWindow = document.querySelector(`#${modalId}`);
    const modal = new bootstrap.Modal(modalWindow);

    const output = modalWindow.getElementsByTagName('p')[0];
    output.innerText = msg;

    modal.show();
}