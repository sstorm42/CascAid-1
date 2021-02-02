import { getLocalStorage } from '../actions';
const serverAddress = 'http://localhost:3001';

export const checkEmailExist = serverAddress + '/api/users/email/';
export const userSignUp = serverAddress + '/api/auth/signup';
export const userSignIn = serverAddress + '/api/auth/signin';
export const userSignOut = serverAddress + '/api/auth/signout';
export const getOneUser = serverAddress + '/api/users/';
export const getAllUsers = serverAddress + '/api/users';
export const createOneUser = serverAddress + '/api/users';
export const updateUser = serverAddress + '/api/users/';
export const deleteOneUser = serverAddress + '/api/users/';
export const userAuth = serverAddress + '/api/auth';
export const changePassword = serverAddress + '/api/auth/';
export const recoverPassword = serverAddress + '/api/auth/recover';
export const resetPassword = serverAddress + '/api/auth/';

export const apiConfig = () => ({ headers: { Authorization: `Bearer ${getLocalStorage('token')}` } });
