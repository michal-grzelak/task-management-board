import { IBase } from './IBase'

export class Base implements IBase {
    id: string
    createdAt: Date
    updatedAt: Date

    constructor() {
        this.id = '1'
        this.createdAt = new Date()
        this.updatedAt = new Date()
    }
}
