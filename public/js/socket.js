document.addEventListener("DOMContentLoaded", function() {
    const host = "http://192.168.0.103:5000"
    const socket = io(host);
    socket.on('connection');

    const points_output_one = document.getElementById("points_output_one");
    const points_output_two = document.getElementById("points_output_two");

    getRoomName = () => {
        return window.location.href.slice(-11);
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
        if (data.result === 'draw') {
            showModal('Ничья')
        } else if (getCookie('guest_token') === data.guest_token) {
            showModal('Выиграл')
        } else {
            showModal('Проиграл')
        }

        points_output_one.innerHTML = data.owner_points;
        points_output_two.innerHTML = data.invited_points;

        listenEvents();
    });
});