"use client"

import { useState } from 'react';
import { useRouter } from 'next/router';
import { CldUploadWidget, CldImage } from 'next-cloudinary';
import { registerUser } from '../services/api';
import NavigationToggleButton from '@/components/NavigationToggleButton';
import { AnimatePresence, motion } from 'framer-motion';
import { DrawerNavigation } from "../components/navigation";
import React from 'react';

interface CloudinaryResult {
  public_id: string;
}
export default function Register() {
  const [publicId, setPublicId] = useState("");
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
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
    <div className="flex flex-col items-center justify-center w-screen h-screen py-6 bg-center bg-no-repeat bg-summonersRift sm:py-8 lg:py-12">
      
<AnimatePresence>
 {isOpen && (
   <>
     <motion.div
       initial={{ opacity: 0, x: -50 }}
       animate={{ opacity: 1, x: 0 }}
       exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
       style={{ position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 120 }}
     >
       <DrawerNavigation />
     </motion.div>
     <motion.div
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0, transition: { duration: 0.3 } }}
       style={{
         position: 'fixed',
         top: 0,
         left: 0,
         right: 0,
         bottom: 0,
         backgroundColor: 'rgba(255, 255, 255, 0.7)',
         zIndex: 110,
         pointerEvents: 'auto', // 클릭 이벤트를 허용하도록 설정
       }}
       onClick={toggleOpen} // 클릭 시 사이드바를 닫도록 설정
     />
   </>
 )}
</AnimatePresence>
<NavigationToggleButton isOpen={isOpen} toggle={toggleOpen} />
{/* 사이드바 종료 */}

      <div className="text-center">
        <h5 className="mb-2 text-neutral-500">가입을 환영합니다!</h5>
        <h1 className="text-4xl font-bold mb-9 text-neutral-700">회원가입</h1>
      </div>
      {error && <p className="text-center text-red-500">{error}</p>}
      {loading ? <p className="text-center">Loading...</p> : (
        <form className="grid max-w-screen-md gap-4 mx-auto sm:grid-cols-2" onSubmit={handleSubmit}>
          <div className="sm:col-span-2">
            <label htmlFor="userName" className="inline-block mb-2 text-sm text-gray-800 sm:text-base text-neutral-700">이름</label>
            <input id="userName" name="userName" type="text" value={formData.userName} onChange={handleChange} autoComplete="username" required className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring" />
          </div>
          <div>
            <label htmlFor="password" className="inline-block mb-2 text-sm text-gray-800 sm:text-base text-neutral-700">비밀번호</label>
            <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} autoComplete="new-password" required className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring" />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="inline-block mb-2 text-sm text-gray-800 sm:text-base text-neutral-700">비밀번호 확인</label>
            <input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} autoComplete="new-password" required className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="inline-block mb-2 text-sm text-gray-800 sm:text-base text-neutral-700">이메일</label>
            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} autoComplete="email" required className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="nickname" className="inline-block mb-2 text-sm text-gray-800 sm:text-base text-neutral-700">닉네임</label>
            <input id="nickname" name="nickname" type="text" value={formData.nickname} onChange={handleChange} required className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring" />
          </div>
          <div className="sm:col-span-2">

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
          <div>
            <label htmlFor="gender" className="inline-block mb-2 text-sm text-gray-800 sm:text-base">성별</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring">
              <option value="">성별 선택</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
              <option value="other">그외</option>
            </select>
          </div>
          <div>
            <label htmlFor="ageGroup" className="inline-block mb-2 text-sm text-gray-800 sm:text-base">나이</label>
            <select id="ageGroup" name="ageGroup" value={formData.ageGroup} onChange={handleChange} className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring">
              <option value="">나이 선택</option>
              <option value="10대">10대</option>
              <option value="20대">20대</option>
              <option value="30대">30대</option>
              <option value="40대">40대</option>
              <option value="50대">50대</option>
              <option value="60대 이상">60대 이상</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="region" className="inline-block mb-2 text-sm text-gray-800 sm:text-base">지역</label>
            <input id="region" name="region" type="text" value={formData.region} onChange={handleChange} required className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring" />
          </div>
          <div className="flex justify-center sm:col-span-2">
            <button type="submit" disabled={loading} className="w-full max-w-xs px-8 py-3 text-sm font-semibold text-center text-white transition duration-100 rounded-lg outline-none bg-neutral-500 ring-neutral-300 hover:bg-neutral-400 focus-visible:ring active:bg-neutral-600 md:text-base">
              {loading ? '회원가입중...' : '가입하기'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}