import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { updateUserProfile } from '../services/api';
import { CldUploadWidget, CldImage } from 'next-cloudinary';

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

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    nickname: '',
    ageGroup: '',
    region: '',
    profileImageUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

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

    setLoading(true);
    setError('');

    try {
      const response = await updateUserProfile(formData);

      if (response.status === 200) {
        router.push('/fetchUser');
      } else {
        setError('Profile update failed');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? <p>Loading...</p> : (
        <form onSubmit={handleSubmit}>
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
              required
            />
          </div>
          <button type="submit" disabled={loading}>{loading ? '업데이트중...' : '프로필 업데이트하기'}</button>

        </form>
      )}
    </div>
  );
};

export default UpdateProfile;
