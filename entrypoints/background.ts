import {onMessage} from "webext-bridge/background";
import {SANITIZE_CHATGPT_REQUEST_PAYLOAD_MSG} from "@/utils/base.constants.ts";
import {RequestPayloadToSanitize, SanitizedMessageResult} from "@/utils/base.types.ts";
import {sanitizeRequestPayload} from "@/utils/base.utils.ts";

export default defineBackground(() => {

    onMessage<RequestPayloadToSanitize>(
        SANITIZE_CHATGPT_REQUEST_PAYLOAD_MSG,
        async ({data}): Promise<SanitizedMessageResult> => {
            return sanitizeRequestPayload(data)
        }
    )
})
