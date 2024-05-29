import jwt from 'jsonwebtoken';

interface User {
  id: string;
  username: string;
}

const generateToken = (user: User): string => {
  const payload = {
    userId: user.id,
    username: user.username,
  };

  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
};

export { generateToken };
