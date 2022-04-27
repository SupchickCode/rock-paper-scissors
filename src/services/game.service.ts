import moveTypes from '../enums/move-types.enum';
import IGameService from '../interface/game-service.interface';
import typeMove from '../types/move.type';
import roomModel from '../models/room.model';


export default class GameService implements IGameService {
    findWinnerMove = (rooms: { [key: string]: any }, data: any): typeMove => {
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

    updatePoints = async (move: typeMove, roomName: string) => {
        try {
            let updateParams: object;
            
            const room = await roomModel.findOne({
                where: {
                    name: roomName
                }
            });

            if (move.result === 'draw') {
                updateParams = {};
            } else if (move.guest_token === room.invited) {
                updateParams = { invited_points: 1 };
            } else if (move.guest_token === room.owner) {
                updateParams = { owner_points: 1 };
            } else {
                return null;
            }

            const updateRoom = await room.increment(
                updateParams,
                { where: { name: roomName } }
            );

            return updateRoom;
        } catch (error) {
            console.log(">> " + error);
        }
    }

    /**
     * Search guest_token in moves
     * 
     * @param moves 
     * @param guest_token 
     * @returns boolean
     */
    alreadyMoved = (moves: typeMove[], guest_token: string): boolean => {
        for (let i = 0; i < moves.length; i++) {
            const move: typeMove = moves[i];

            if (move.guest_token === guest_token) {
                return true;
            }
        }

        return false;
    }
}
