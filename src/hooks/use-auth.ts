import { useState, useEffect } from 'react';
import { User } from '@/types';

export function useAuth() {
  const [user, setUser] = useState<User | null>({
    _id: 'user_1',
    tokenIdentifier: 'mock|user_1',
    name: 'عباس',
    email: "abbas@yamo'een.ye",
    points: 120,
    ratingSum: 48,
    ratingCount: 10,
    city: 'sanaa',
  });

  const [isLoading, setIsLoading] = useState(false);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout: () => setUser(null),
    login: () => setUser({
        _id: 'user_1',
        tokenIdentifier: 'mock|user_1',
        name: 'عباس',
        email: "abbas@yamo'een.ye",
        points: 120,
        ratingSum: 48,
        ratingCount: 10,
        city: 'sanaa',
    })
  };
}
