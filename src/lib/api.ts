import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          const response = await axiosInstance.post('/user/refreshToken', { token: refreshToken });
          const { accessToken, refreshToken: newRefreshToken } = response.data;

          localStorage.setItem('token', accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (err) {
          console.error('Error refreshing token', err);
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);


export const registerUser = async (formData: FormData) => {
  return axiosInstance.post('/user/register', formData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const loginUser = async (email: string, password: string) => {
  return axiosInstance.post('/user/login', { email, password }, {
    headers: {
      'Content-Type': 'application/json'
    },
  });
};

export const changePassword = async (currentPassword: string, newPassword: string) => {
  const token = localStorage.getItem('token');
  return axiosInstance.post('/user/change-password', { currentPassword, newPassword }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const refreshToken = async (refreshToken: string) => {
  return axiosInstance.post('/user/refreshToken', { token: refreshToken }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const fetchUserProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.get('/user/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateUserProfile = async (profileData: any) => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.post('/user/updateProfile', profileData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
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

export const getPoliticianDetails = async (code: string) => {
  try {
    const response = await axiosInstance.get(`/politician/${code}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching politician details:', error);
    throw error;
  }
};