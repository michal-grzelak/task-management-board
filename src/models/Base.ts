import { v4 as uuid } from 'uuid'

import { IBase } from './IBase'

export class Base implements IBase {
    id: string
    createdAt: Date
    updatedAt: Date

    constructor() {
        this.id = uuid()
        this.createdAt = new Date()
        this.updatedAt = this.createdAt
    }
}
