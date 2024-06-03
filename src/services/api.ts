import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

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
}, error => {
  return Promise.reject(error);
});

const refreshToken = async () => {
  try {
    const response = await axiosInstance.post('/refreshToken', {
      token: localStorage.getItem('refreshToken'),
    });
    localStorage.setItem('token', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data.accessToken;
  } catch (error) {
    console.error('Error refreshing token', error);
    throw error;
  }
};

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error('Error refreshing token', err);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
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
  nickname: string;
  gender: string;
  ageGroup: string;
  region: string;
  profileImage?: string;
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
    const response = await axiosInstance.post('/user/register', data);
    return response;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (data: LoginData) => {
  try {
    const response = await axiosInstance.post('/user/login', data);
    localStorage.setItem('token', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const changePassword = async (data: ChangePasswordData) => {
  try {
    const response = await axiosInstance.post('/user/change-password', data);
    return response;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};

export const fetchUserProfile = async () => {
  try {
    const response = await axiosInstance.get('/user/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
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
  profileImage: string;
}

export const updateUserProfile = async (data: UpdateProfileData) => {
  try {
    const response = await axiosInstance.post('/user/updateProfile', data);
    return response;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post('/user/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
    return response;
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

export const submitQuizAnswers = async (data: SubmitQuizData) => {
  try {
    console.log('Submitting quiz answers:', data); // 데이터 확인을 위해 콘솔 로그 추가
    const response = await axiosInstance.post('/PoliticsQuiz/submit', data);
    console.log('Received response:', response.data); // 응답 데이터 확인을 위해 콘솔 로그 추가
    return response.data;
  } catch (error) {
    console.error('Error submitting quiz answers:', error); // 오류 확인을 위해 콘솔 로그 추가
    throw error;
  }
};