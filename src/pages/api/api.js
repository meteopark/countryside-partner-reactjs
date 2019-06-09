import {GlobalsContext} from "../globals";

const API_HOST = GlobalsContext._currentValue.server_host;
const API_OPENAPI_CHAT_INTRO = "/api/openapi/chat/intro";

export default {

    getOpenApiChatIntro: () => {

        return fetch(`${API_HOST}${API_OPENAPI_CHAT_INTRO}`)
            .then(res => res.json());
    },

}
