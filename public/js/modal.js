function showModal(msg = '', modalId = 'result-output') {
    const modalWindow = document.querySelector(`#${modalId}`);
    const modal = new bootstrap.Modal(modalWindow);

    const output = modalWindow.getElementsByTagName('p')[0];
    output.innerText = msg;

    modal.show();
}