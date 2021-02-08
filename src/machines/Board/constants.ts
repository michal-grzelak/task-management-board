export enum BoardState {
    IDLE = 'IDLE',
    INITIALIZING = 'INITIALIZING',
    FETCHING = 'FETCHING',
    ERROR = 'ERROR',
}

export enum BoardEvents {
    FETCH = 'FETCH',
    GO_TO_IDLE = 'GO_TO_IDLE',
}
