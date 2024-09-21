import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const fetchUsers = async () => {
    const token = localStorage.getItem('token'); // get token from localStorage
    const response = await axios.get(`${API_URL}/`, {
        headers: {
          Authorization: `Bearer ${token}`, // put token in header for auth
        },
    });
    console.log('API Response:', response.data);
    return response.data; // return the user data
};

export const loginUser = async (credentials: { email: string; password: string }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      console.log('Login response:', response.data); // for debugging
      const { token, user } = response.data; // get JWT and user from response
      localStorage.setItem('token', token); // store token in localStorage
      localStorage.setItem('userName', user.name); // this is for displaying user's name
      return user.name;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
};

export const registerUser = async (credentials: { name: string; email: string; password: string }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, credentials);
      console.log('Register response:', response.data); // for debugging
      return response.data;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
};