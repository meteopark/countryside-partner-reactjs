import {GlobalsContext} from "../globals";

const API_HOST = GlobalsContext._currentValue.server_host;

// const API_SEND_MESSAGE = "/api/v1/chat/message";
const API_SEND_MESSAGE = "/api/v1/chat/message";
const API_MESSAGE_LISTS = "/api/v1/chat/message";

export default {

    getBasicNextPage: (url) => {

        let headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        };
        return fetch(`${url}`,{
            method: 'get',
            headers: headers,
        }).then(
            res => res.json()
        );
    },

    getMessageLists: (chat_id, page) => {

        let headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        };
        return fetch(`${API_HOST}${API_MESSAGE_LISTS}/${chat_id}?page=${page}`,{
            method: 'get',
            headers: headers,
        }).then(
            res => res.json()
        );
    },

    sendMessage: (form) => {

        let headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        };
        return fetch(`${API_HOST}${API_SEND_MESSAGE}`,{
            method: 'post',
            body: form,
            headers: headers,
        }).then(
            res => res.json()
        );
    }

}
