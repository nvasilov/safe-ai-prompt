import {onMessage} from "webext-bridge/window";
import {allowWindowMessaging, sendMessage} from 'webext-bridge/content-script'
import {CHATGPT_URL_MATCH, SANITIZE_CHATGPT_REQUEST_PAYLOAD, WORLD_TO_ISOLATED_NS} from "@/utils/base.constants.ts";

export default defineContentScript({
    matches: [CHATGPT_URL_MATCH],
    world: "ISOLATED", // default
    main: () => {

        allowWindowMessaging(WORLD_TO_ISOLATED_NS)

        // propagate to background
        onMessage(SANITIZE_CHATGPT_REQUEST_PAYLOAD, async ({data}) => {
            return await sendMessage(SANITIZE_CHATGPT_REQUEST_PAYLOAD, data)
        })
    }
})
