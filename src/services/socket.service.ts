import ISoocketService from '../interface/socker-service.interface';

export default class SocketService implements ISoocketService {
    findWinner = (rooms: { [key: string]: any }, data: any) => {
        let room = rooms[data.roomName];

        for (let i = 0; i <= room.length - 1; i++) {
            const move = room[i];
            console.log(move);
        }
    }
}
