document.addEventListener("DOMContentLoaded", function() {
    const host = "http://localhost:5000" // string length 27
    const socket = io(host);
    const points_output_one = document.getElementById("points_output_one");
    const points_output_two = document.getElementById("points_output_two");

    // TODO REFACTOR THIS FUNC
    getRoomName = () => {
        return window.location.href.slice(27);
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

    socket.on('connection');

    socket.emit('join room', roomName)

    socket.on('round end', (data) => {
        if (data.result === 'draw') {
            showModal('Ничья')
        } else if (getCookie('guest_token') === data.guest_token) {
            showModal('Победа')
        } else {
            showModal('Луз')
        }

        // edit points
        points_output_one.innerHTML = data.owner_points;
        points_output_two.innerHTML = data.invited_points;

        listenEvents();
    });
});