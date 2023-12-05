import axios from 'axios';

const API_KEY = 'AIzaSyARHEgtuBT6EeXp5K-EGxplQ95Ah6N2vbE';
const BASE_URL = 'https://greengas-935d5-default-rtdb.firebaseio.com';

const signIn = async (email, password) => {
    try {
        await axios.post(`${BASE_URL}:signInWithPassword?key=${API_KEY}`, {
            email,
            password,
            returnSecureToken: true,
        });
    } catch (error) {
        if (error.response.data.error.message === 'INVALID_LOGIN_CREDENTIALS') {
            throw Error('Usuario/Senha inválidos');
        }
    }
};

const register = async (displayName, email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}:register?key=${API_KEY}`, {
            email,
            password,
            returnSecureToken: true,
        });
        await update(response.data.idToken, displayName);
    } catch (error) {
        if (error.response.data.error.message === 'EMAIL_EXISTS') {
            throw Error('Usuario já cadastrado');
        }
    }
};


export { signIn, register };
