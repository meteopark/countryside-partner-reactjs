import {GlobalsContext} from "../globals";

const API_HOST = GlobalsContext._currentValue.server_host;

// const API_SEND_MESSAGE = "/api/v1/chat/message";
const API_SEND_MESSAGE = "/api/chat/message";

export default {

    sendMessage: (form) => {

        // let config = {
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //         'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //     }
        // };
        return fetch(`${API_HOST}${API_SEND_MESSAGE}`,{
            method: 'post',
            body: form,
        }).then(
            res => res.json()
        );
    }

}
