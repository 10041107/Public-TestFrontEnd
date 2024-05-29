import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 쿠키를 포함하여 전송하도록 설정
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && error.response.data.message === 'Token expired' && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axiosInstance.post('/refreshToken');
        const { accessToken } = response.data;

        localStorage.setItem('token', accessToken); // 새로운 액세스 토큰 저장
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error('Error refreshing token', err);
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

export const registerUser = async (data) => {
  try {
    const response = await axiosInstance.post('/user/register', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  const response = await axiosInstance.post('/user/login', { email, password }, {
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return response.data;
};

export const changePassword = async (currentPassword, newPassword) => {
  const token = localStorage.getItem('token');
  return axiosInstance.post('/user/change-password', { currentPassword, newPassword }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const fetchUserProfile = async () => {
  const response = await axiosInstance.get('/user/me');
  return response.data;
};


export const getPoliticianList = async () => {
  try {
    const response = await axiosInstance.get('/politician');
    return response.data;
  } catch (error) {
    console.error('Error fetching politician list:', error);
    throw error;
  }
};

export const getPoliticianDetails = async (code) => {
  try {
    const response = await axiosInstance.get(`/politician/${code}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching politician details:', error);
    throw error;
  }
};

export const updateUserProfile = async (data) => {
  try {
    const response = await axiosInstance.post('/user/updateProfile', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  return axiosInstance.post('/user/logout');
};