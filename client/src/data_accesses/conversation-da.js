import axios from 'axios';
import * as APIPaths from '../constants/api-paths';

class ConversationDA {
    create_new_conversation = (conversation) => {
        return axios
            .post(APIPaths.createConversation, conversation, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => {
                console.log(err);
                return err.response.data;
            });
    };
    create_new_message = (message) => {
        return axios
            .post(APIPaths.createOneMessage, message, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => {
                console.log(err);
                return err.response.data;
            });
    };
}

export default new ConversationDA();
