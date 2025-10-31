import type {Storage as PersistStorage} from 'redux-persist';
import {storage} from '#imports'
import {STORAGE_PREFIX} from "@/utils/base.constants.ts";

export const wxtPersistStorage: PersistStorage = {
    getItem(key) {
        return storage.getItem<string>(`${STORAGE_PREFIX}:${key}`)
    },

    setItem(key, value) {
        return storage.setItem(`${STORAGE_PREFIX}:${key}`, value)
    },

    removeItem(key) {
        return storage.removeItem(`${STORAGE_PREFIX}:${key}`)
    }
}