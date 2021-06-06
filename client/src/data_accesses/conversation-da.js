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
        console.log('🚀 ~ file: conversation-da.js ~ line 15 ~ ConversationDA ~ message', message);
        return axios
            .post(APIPaths.createOneMessage, message, APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => {
                console.log(err);
                return err.response.data;
            });
    };
    get_all_conversations_by_user = (userId) => {
        return axios
            .get(APIPaths.getAllConversationsByUser(userId), APIPaths.apiConfig())
            .then((response) => {
                console.log('🚀 ~ file: conversation-da.js ~ line 27 ~ ConversationDA ~ .then ~ response', response);

                return response.data;
            })
            .catch((err) => {
                console.log(err);
                return err.response.data;
            });
    };
    get_conversation = (conversationId) => {
        return axios
            .get(APIPaths.getOneConversation(conversationId), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => {
                console.log(err);
                return err.response.data;
            });
    };
    get_conversations_count_by_user = (userId) => {
        return axios
            .get(APIPaths.getConversationCountByUser(userId), APIPaths.apiConfig())
            .then((response) => response.data)
            .catch((err) => {
                console.log(err);
                return err.response.data;
            });
    };
}

export default new ConversationDA();
