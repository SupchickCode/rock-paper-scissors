
export default interface IGameService {
    findWinnerMove(rooms : { [key: string]: any }, data: object) : any;    
}
