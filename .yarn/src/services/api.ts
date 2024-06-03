import axios from 'axios';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
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

        localStorage.setItem('token', accessToken); 
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

interface RegisterData {
  email: string;
  password: string;
  userName: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

interface SubmitQuizData {
  uid: string;
  sex: string;
  age: number;
  choiceAnswers: number[];
  shortAnswers: string[];
}

export const registerUser = async (data: RegisterData) => {
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

export const loginUser = async (data: LoginData) => {
  const response = await axiosInstance.post('/user/login', data, {
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return response.data;
};

export const changePassword = async (data: ChangePasswordData) => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.post('/user/change-password', data, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return response;
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

export const getPoliticianDetails = async (code: string) => {
  try {
    const response = await axiosInstance.get(`/politician/${code}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching politician details:', error);
    throw error;
  }
};

interface UpdateProfileData {
  userName: string;
  nickname: string;
  ageGroup: string;
  region: string;
  profileImageUrl: string;
}

export const updateUserProfile = async (data: UpdateProfileData) => {
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

export const submitQuizAnswers = async (data: SubmitQuizData) => {
  try {
    const response = await axiosInstance.post('/PoliticsQuiz/submit', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting quiz answers:', error);
    throw error;
  }
};
