export interface ILocalStorageService {
    set: <T>(key: string, value: T) => T | null

    get: <T>(key: string) => T | null

    remove: <T>(key: string) => T | null

    exists: (key: string) => boolean
}
