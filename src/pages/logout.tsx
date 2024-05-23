import { useRouter } from 'next/router';
import { Button } from "antd";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (response.ok) {
        localStorage.removeItem('token');
        router.push('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}
