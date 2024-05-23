"use client"

import { useState } from 'react';
import { useRouter } from 'next/router';
import { CldUploadWidget, CldImage } from 'next-cloudinary';
import { registerUser } from '../lib/api';

// 인터페이스 정의
interface CldUploadResult {
  event: string;
  info: {
    secure_url: string;
    width: number;
    height: number;
    bytes: number;
  };
}

interface CldUploadError {
  message: string;
}

export default function Register() {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    confirmPassword: '',
    email: '',
    nickname: '',
    gender: '',
    ageGroup: '',
    region: '',
    profileImageUrl: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = (error: CldUploadError | null, result: CldUploadResult | null) => {
    if (error) {
      setImageError('Image upload failed. Please try again.');
      return;
    }

    if (result && result.event === 'success') {
      const { secure_url, width, height, bytes } = result.info;
      if (width <= 500 && height <= 500 && bytes <= 5 * 1024 * 1024) { // 5MB = 5 * 1024 * 1024 bytes
        setFormData((prevData) => ({ ...prevData, profileImageUrl: secure_url }));
        setImageError('');
      } else {
        setImageError('Image must be 500x500 pixels or smaller and less than 5MB.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key as keyof typeof formData] !== null) {
        form.append(key, formData[key as keyof typeof formData] as string | Blob);
      }
    });

    setLoading(true);
    setError('');

    try {
      const response = await registerUser(form);
      if (response.status === 201) {
        router.push('/login');
      } else {
        setError('Registration failed');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? <p>Loading...</p> : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userName">Username:</label>
            <input
              id="userName"
              name="userName"
              type="text"
              value={formData.userName}
              onChange={handleChange}
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>
          <div>
            <label htmlFor="nickname">Nickname:</label>
            <input
              id="nickname"
              name="nickname"
              type="text"
              value={formData.nickname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="profileImage">Profile Image:</label>

            <CldImage
                width="150"
                height="150"
                src="mfgk0lhtvvqqxpckqtbz"
                alt="Description of my image"
              />

            <CldUploadWidget uploadPreset="p22qmytj" onUpload={(error: any, result: any) => handleImageUpload(error, result)}>
              {({ open }) => (
                <button type="button" onClick={() => open()}>
                  Upload Profile Image
                </button>
              )}
            </CldUploadWidget>
            {imageError && <p style={{ color: 'red' }}>{imageError}</p>}
          </div>
          <div>
            <label htmlFor="gender">Gender:</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="ageGroup">Age Group:</label>
            <select id="ageGroup" name="ageGroup" value={formData.ageGroup} onChange={handleChange}>
              <option value="">Select Age Group</option>
              <option value="10대">10대</option>
              <option value="20대">20대</option>
              <option value="30대">30대</option>
              <option value="40대">40대</option>
              <option value="50대">50대</option>
              <option value="60대 이상">60대 이상</option>
            </select>
          </div>
          <div>
            <label htmlFor="region">Region:</label>
            <input
              id="region"
              name="region"
              type="text"
              value={formData.region}
              onChange={handleChange}
            />
          </div>
          <button type="submit" disabled={loading}>{loading ? '회원가입중...' : '가입하기'}</button>
        </form>
      )}
    </div>
  );
}
