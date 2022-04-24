import moveTypes from '../enums/move-types.enum';
import ISoocketService from '../interface/socker-service.interface';


// TODO rename in to gameService or smth like this
export default class SocketService implements ISoocketService {
    findWinner = (rooms: { [key: string]: any }, data: any) => {
        const room: object[] = rooms[data.roomName];

        // room.map((item : any) => item.move);

        let firstMove: string = '';
        let secondMove: string = '';

        for (let i = 0; i <= room.length - 1; i++) {
            const move: any = room[i];
        }

        if (firstMove === secondMove) {
            console.log('draw');
        } else if (firstMove == moveTypes.paper && secondMove == moveTypes.rock) {
            console.log('win first');
        } else if (firstMove == moveTypes.scissors && secondMove == moveTypes.paper) {
            console.log('win first');
        } else if (firstMove == moveTypes.rock && secondMove == moveTypes.scissors) {
            console.log('win first');
        } else {
            console.log('win second');
        }
    }
}
