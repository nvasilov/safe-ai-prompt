import {SanitizedResult} from "@/utils/base.types.ts";
import {EMAIL_PLACEHOLDER, EMAIL_REGEX} from "@/utils/base.constants.ts";

export const sanitizeText = (text: string): SanitizedResult => {
    const emails: string[] = text.match(EMAIL_REGEX) || [] // look for emails in the text

    // replace emails with placeholder only if at least one email is present in the text
    const value = emails && emails.length > 0 ? text.replace(EMAIL_REGEX, EMAIL_PLACEHOLDER) : text

    return {emails, value}
}