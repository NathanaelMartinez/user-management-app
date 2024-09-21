import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const fetchUsers = async () => {
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJpYXQiOjE3MjY5Mzk1ODAsImV4cCI6MTcyNjk0MzE4MH0.MBw3xhrBgX4FL2lQawaAE_WvLJD4RdWQJpZ_LTIihng"
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