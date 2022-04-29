document.addEventListener("DOMContentLoaded", function() {
    const host = window.location.origin;
    const socket = io(host);

    socket.on('connection');

    const points_output_one = document.getElementById("points_output_one");
    const points_output_two = document.getElementById("points_output_two");

    getRoomName = () => {
        return window.location.href.slice(-10);
    }

    const roomName = getRoomName();

    getCookie = (cookieName) => {
        let name = cookieName + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');

        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }

        return "";
    }

    socket.emit('join room', { roomName: roomName, guest_token: getCookie('guest_token') })

    removelistenEvents = () => {
        document.querySelectorAll('.btn').forEach(item => {
            item.replaceWith(item.cloneNode(true));
        })
    }

    listenEvents = () => {
        document.querySelectorAll('.btn').forEach(item => {
            item.addEventListener('click', event => {
                const data = {
                    guest_token: getCookie('guest_token'),
                    move: event.target.getAttribute("data-type"),
                    roomName: roomName
                }

                socket.emit('make move', data)

                removelistenEvents();
            })
        })
    }

    listenEvents();

    socket.on('joined', (data) => {
        if (data.guest_token !== getCookie('guest_token')) {
            showModal('Друг подключился', 'joined')
        }
    })

    socket.on('round end', (data) => {
        const token = getCookie('guest_token');

        if (data.result === 'draw') {
            showModal('Ничья')
        } else if (token === data.guest_token) {
            showModal('Выиграл')
        } else {
            showModal('Проиграл')
        }

        if (data.owner_token === token) {
            points_output_one.innerHTML = data.owner_points;
            points_output_two.innerHTML = data.invited_points;
        } else {
            points_output_one.innerHTML = data.invited_points;
            points_output_two.innerHTML = data.owner_points;
        }

        listenEvents();
    });
});