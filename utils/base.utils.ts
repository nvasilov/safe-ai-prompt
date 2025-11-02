import {SanitizedResult} from "@/utils/base.types.ts";
import {EMAIL_PLACEHOLDER, EMAIL_REGEX} from "@/utils/base.constants.ts";

export const sanitizeText = (text: string): SanitizedResult => {
    const emails: string[] = text.match(EMAIL_REGEX) || [] // look for emails in the text

    // replace emails with placeholder only if at least one email is present in the text
    const value = emails && emails.length > 0 ? text.replace(EMAIL_REGEX, EMAIL_PLACEHOLDER) : text

    return {emails, value}
}

export const DISTINCT_VALUES = <T extends string | number | null>(item: T, idx: number, arr: T[]) => arr.indexOf(item) === idx

export const sanitizeKey = <T>(key: T): T => {

    if (typeof key === 'number') {
        return key
    } else if (typeof key !== 'string') {
        throw new Error(`The key "${key}" must be a number or string.`);
    }

    const dangerousKeys = ['__proto__', 'prototype', 'constructor'];
    const safePattern = /^[a-zA-Z0-9_-]+$/;

    // Check against a dangerous key list
    if (dangerousKeys.includes(key)) {
        throw new Error(`The key "${key}" is not allowed.`);
    }

    // Optionally, validate with a regex for allowed characters
    if (!safePattern.test(key)) {
        throw new Error(`The key "${key}" contains unsafe characters.`);
    }

    return key
}