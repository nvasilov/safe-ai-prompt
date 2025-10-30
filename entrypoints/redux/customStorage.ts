import type {Storage as PersistStorage} from 'redux-persist';
import {storage} from '#imports'

const PREFIX = 'local:'

export const wxtPersistStorage: PersistStorage = {
    getItem(key) {
        return storage.getItem<string>(`${PREFIX}:${key}`)
    },

    setItem(key, value) {
        return storage.setItem(`${PREFIX}:${key}`, value)
    },

    removeItem(key) {
        return storage.removeItem(`${PREFIX}:${key}`)
    }
}