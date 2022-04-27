document.addEventListener("DOMContentLoaded", function() {
    const btn = document.getElementById('create-btn');
    const output = document.getElementById('output-rooms');
    const host = window.location.origin;

    addRemoveEvents = () => {
        const btns = document.getElementsByClassName('remove-btn');

        Array.prototype.forEach.call(btns, (item) => {
            item.addEventListener('click', event => {
                fetch(host + '/room', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        alert(data.status);
                    });;
            })
        });
    }

    btn.addEventListener('click', (event) => {
        fetch(host + '/room', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.status === 201) {
                    output.insertAdjacentHTML("beforeBegin",
                        `<a href="/room/${data.data}" class="list-group-item list-group-item-action list-group-item-primary">Комната ${data.data}</a><span class="remove-btn" date-room="${data.data}">Удалить</span>`)

                    addRemoveEvents();

                    return;
                }

                alert(data.data);
            });;
    })

    addRemoveEvents();
});