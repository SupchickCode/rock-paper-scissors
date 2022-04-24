import moveTypes from '../enums/move-types.enum';
import IGameService from '../interface/game-service.interface';
import typeMove from '../types/move.type';


export default class GameService implements IGameService {
    findWinnerMove = (rooms: { [key: string]: any }, data: any) => {
        const room: typeMove[] = rooms[data.roomName];
        const firstMove: typeMove = room[0];
        const secondMove: typeMove = room[1];

        if (firstMove.move === secondMove.move) {
            firstMove.result = 'draw'
            secondMove.result = 'draw'
        } else if (firstMove.move == moveTypes.paper && secondMove.move == moveTypes.rock) {
            firstMove.result = 'win'
        } else if (firstMove.move == moveTypes.scissors && secondMove.move == moveTypes.paper) {
            firstMove.result = 'win'
        } else if (firstMove.move == moveTypes.rock && secondMove.move == moveTypes.scissors) {
            firstMove.result = 'win'
        } else {
            secondMove.result = 'win'

            return secondMove;
        }

        return firstMove;
    }
}
