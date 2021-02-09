export enum BoardState {
    IDLE = 'IDLE',
    INITIALIZING = 'INITIALIZING',
    UPDATING = 'UPDATING',
    FETCHING = 'FETCHING',
    ERROR = 'ERROR',
}

export enum BoardUpdatingState {
    ADDING_COLUMN = 'ADDING_COLUMN',
    UPDATING = 'UPDATING',
}

export enum BoardEvents {
    FETCH = 'FETCH',
    GO_TO_IDLE = 'GO_TO_IDLE',
    ADD_COLUMN = 'ADD_COLUMN',
    UPDATE = 'UPDATE',
}
