import { ILocalStorageService } from './ILocalStorageService'

export class LocalStorageService implements ILocalStorageService {
    set = <T>(key: string, value: T): T | null => {
        try {
            localStorage.setItem(key, JSON.stringify(value))

            return value
        } catch {
            return null
        }
    }

    get = <T>(key: string): T | null => {
        try {
            const value = localStorage.getItem(key)

            if (value) return JSON.parse(value) as T

            return null
        } catch {
            return null
        }
    }

    remove = <T>(key: string): T | null => {
        const value = this.get<T>(key)

        if (value) {
            try {
                localStorage.removeItem(key)

                return value
            } catch {
                return null
            }
        }

        return null
    }

    exists = (key: string) => {
        const value = this.get<any>(key)

        return Boolean(value)
    }
}
