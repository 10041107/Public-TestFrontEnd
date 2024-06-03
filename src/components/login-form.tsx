import { useState } from 'react';
import { loginUser } from '../services/api';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigateToTerms = () => {
    router.push('/terms');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await loginUser({ email: formData.email, password: formData.password });
      localStorage.setItem('token', response.accessToken); // 액세스 토큰 저장
      router.push('/');
    } catch (error: any) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-6 bg-white sm:py-8 lg:py-12">
      <div className="px-4 mx-auto max-w-screen-2xl md:px-8">
        <form className="max-w-lg mx-auto border rounded-lg" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-4 md:p-8">
            {error && <p className="text-red-500">{error}</p>}
            <div>
              <label htmlFor="email" className="inline-block mb-2 text-sm text-neutral-800 sm:text-base">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 transition duration-100 border rounded outline-none text-neutral-800 bg-neutral-50 ring-indigo-300 focus:ring"
              />
            </div>
            <div>
              <label htmlFor="password" className="inline-block mb-2 text-sm text-neutral-800 sm:text-base">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 transition duration-100 border rounded outline-none text-neutral-800 bg-neutral-50 ring-indigo-300 focus:ring"
              />
            </div>
            <button type="submit" className="block px-8 py-3 text-sm font-semibold text-center text-white transition duration-100 rounded-lg outline-none bg-neutral-700 ring-neutral-300 hover:bg-neutral-600 focus-visible:ring active:bg-neutral-600 md:text-base">
              로그인
            </button>
            <button type="button" className="block px-8 py-3 text-sm font-semibold text-center text-white transition duration-100 rounded-lg outline-none bg-neutral-700 ring-neutral-300 hover:bg-neutral-600 focus-visible:ring active:bg-neutral-600 md:text-base"
              onClick={navigateToTerms}
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
