export enum BoardListState {
    IDLE = 'IDLE',
    FETCHING = 'FETCHING',
    UPDATING = 'UPDATING',
    ERROR = 'ERROR',
}

export enum BoardListUpdatingState {
    ADDING = 'ADDING',
}

export enum BoardListEvents {
    FETCH = 'FETCH',
    ADD = 'ADD',
}
