import typeMove from '../types/move.type';

export default interface IGameService {
    findWinnerMove(rooms: { [key: string]: any }, data: object): typeMove;
    updatePoints(data: typeMove, roomName: string): any;
    alreadyMoved(rooms : typeMove[], guest_token : string) : boolean;
}
