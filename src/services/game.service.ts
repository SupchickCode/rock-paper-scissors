import moveTypes from '../enums/move-types.enum';
import IGameService from '../interface/game-service.interface';
import typeMove from '../types/move.type';
import sequelize from '../database/sequelize';
import e from 'express';


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

    updatePoints = async (move: typeMove, room: any) => {
        let field: string = '';

        if (move.guest_token === room.owner) {
            field = 'owner_points';
        } else if (move.guest_token === room.invited) {
            field = 'owner_invited';
        } else {
            return null;
        }

        room.updateOne(
            { owner_points: sequelize.literal(`${field} + 1`) },
            { where: { name: move.roomName } }
        );
    }
}
