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
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            roomName: event.target.getAttribute("date-room"),
                        })
                    }).then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        if (data.status === 204) {
                            event.target.parentElement.remove();
                        }
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
                        `<div>
                            <a href="/room/${data.data}" class="list-group-item list-group-item-action list-group-item-primary">Комната ${data.data}</a>
                            <span class="remove-btn" date-room="${data.data}">Удалить</span>
                        </div>`)

                    addRemoveEvents();

                    return;
                }

                alert(data.data);
            });;
    })

    addRemoveEvents();
});