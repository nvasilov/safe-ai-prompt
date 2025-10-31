import {onMessage} from "webext-bridge/background";
import {SANITIZE_CHATGPT_REQUEST_PAYLOAD} from "@/utils/base.constants.ts";
import {store} from "@/redux/store.ts";
import {updateMinutesToIgnore} from "@/services/prompts.slice";

export default defineBackground(() => {

    onMessage<string>(SANITIZE_CHATGPT_REQUEST_PAYLOAD, async ({data: requestPayload}) => {

        return `sanitized requestPayload`
    })

});
