import { useRouter } from 'next/router';
import { Button } from "antd";

export default function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (response.ok) {
        localStorage.removeItem('token');
        router.push('/');
      } else {
        console.error('로그아웃 실패');
      }
    } catch (error) {
      console.error('로그아웃 실패', error);
    }
  };

  return <Button className={className} onClick={handleLogout}>로그아웃</Button>;
}
