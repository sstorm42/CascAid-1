// import axios from 'axios';
// import * as APIPaths from '../constants/api-paths';

// class IndividualDA {
//     get_basic_info = (userId) => {
//         return axios
//             .get(APIPaths.getIndividualBasicInfo(userId), APIPaths.apiConfig())
//             .then((response) => response.data)
//             .catch((err) => err.response.data);
//     };
//     set_basic_info = (userId, basicInfo) => {
//         return axios
//             .put(APIPaths.setIndividualBasicInfo(userId), basicInfo, APIPaths.apiConfig())
//             .then((response) => {
//                 return response.data;
//             })
//             .catch((err) => err.response.data);
//     };
//     get_involvement = (userId) => {
//         return axios
//             .get(APIPaths.getIndividualInvolvement(userId), APIPaths.apiConfig())
//             .then((response) => response.data)
//             .catch((err) => err.response.data);
//     };
//     set_involvement = (userId, involvement) => {
//         return axios
//             .put(APIPaths.setIndividualInvolvement(userId), involvement, APIPaths.apiConfig())
//             .then((response) => response.data)
//             .catch((err) => err.response.data);
//     };
//     get_privacy = (userId) => {
//         return axios
//             .get(APIPaths.getIndividualPrivacy(userId), APIPaths.apiConfig())
//             .then((response) => response.data)
//             .catch((err) => err.response.data);
//     };
//     set_privacy = (userId, privacy) => {
//         return axios
//             .put(APIPaths.setIndividualPrivacy(userId), privacy, APIPaths.apiConfig())
//             .then((response) => response.data)
//             .catch((err) => err.response.data);
//     };
//     get_public_info = (userId) => {
//         return axios
//             .get(APIPaths.getIndividualPublicInfo(userId))
//             .then((response) => {
//                 return response.data;
//             })
//             .catch((err) => err.response.data);
//     };
//     get_list = () => {
//         return axios
//             .get(APIPaths.getIndividualList)
//             .then((response) => response.data)
//             .catch((err) => err.response.data);
//     };
// }
// export default new IndividualDA();
