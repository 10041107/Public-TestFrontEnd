import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { updateUserProfile } from '../../services/api';
import { CldUploadWidget, CldImage } from 'next-cloudinary';

interface CloudinaryResult {
  public_id: string;
}

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    nickname: '',
    ageGroup: '',
    region: '',
    profileImageUrl: '',
  });
  const [publicId, setPublicId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string>('');

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

  const handleImageUpload = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "your_upload_preset");
    const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: "POST",
        body: data,
      });
      const uploaded = await res.json();
      if (uploaded.secure_url) {
        setImage(uploaded.secure_url);
        setFormData((prevData) => ({ ...prevData, profileImageUrl: uploaded.secure_url }));
        setImageError('');
      } else {
        setImageError('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      setImageError('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const imageUploadBtn = () => {
    inputRef.current?.click();
  };

  const fileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await handleImageUpload(e.target.files[0]);
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
        setError('프로필 업데이트에 실패했습니다.');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hide-scrollbar" style={{ height: '100vh', overflowY: 'scroll' }}>

    <div className="flex flex-col items-center p-4">
      <h1 className="mb-4 text-2xl">프로필 수정</h1>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? <p>로딩 중...</p> : (
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="nickname" className="block text-gray-700">닉네임:</label>
            <input
              id="nickname"
              name="nickname"
              type="text"
              value={formData.nickname}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">

          <label htmlFor="profileImage" className="inline-block mb-2 text-sm text-gray-800 sm:text-base text-neutral-700">프로필 이미지</label>
            {publicId && (
              <CldImage
                src={publicId}
                width={270}
                height={180}
                alt="Uploaded Image Not Found"
              />
            )}
            <CldUploadWidget uploadPreset="p22qmytj"
              onUpload={(result, widget) => {
                if (result.event !== "success") return;
                const info = result.info as CloudinaryResult;
                setPublicId(info.public_id);
              }}
            >
              {({ open }) => (
                <button type="button" onClick={() => open()} className="block w-full px-4 py-2 text-white rounded bg-neutral-500 ring-neutral-300 hover:bg-neutral-400">
                  프로필 이미지 업로드
                </button>
              )}
            </CldUploadWidget>
            {imageError && <p className="text-red-500">{imageError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="ageGroup" className="block text-gray-700">연령대:</label>
            <select
              id="ageGroup"
              name="ageGroup"
              value={formData.ageGroup}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">연령대를 선택하세요</option>
              <option value="10대">10대</option>
              <option value="20대">20대</option>
              <option value="30대">30대</option>
              <option value="40대">40대</option>
              <option value="50대">50대</option>
              <option value="60대 이상">60대 이상</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="region" className="block text-gray-700">지역:</label>
            <input
              id="region"
              name="region"
              type="text"
              value={formData.region}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button type="submit" disabled={loading} className="w-full px-4 py-2 text-white bg-blue-500 rounded">
            {loading ? '업데이트 중...' : '프로필 업데이트'}
          </button>
        </form>
      )}
    </div>
    </div>
  );
};

export default UpdateProfile;
