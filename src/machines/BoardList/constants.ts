export enum BoardListState {
    IDLE = 'IDLE',
    FETCHING = 'FETCHING',
    UPDATING = 'UPDATING',
    ERROR = 'ERROR',
}

export enum BoardListUpdatingState {
    ADDING = 'ADDING',
    DELETING = 'DELETING',
}

export enum BoardListEvents {
    FETCH = 'FETCH',
    ADD = 'ADD',
    DELETE = 'DELETE',
}
