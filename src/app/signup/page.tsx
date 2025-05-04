"use client";

import { Card } from '@/components/card/card';
import styles from './signup.module.css';
import { Input } from '@/components/input/input';
import { Label } from '@/components/label/label';
import { Button } from '@/components/button/button';
import { useAppDispatch } from '../../store/hooks';
import { useRouter } from 'next/navigation'
import { login } from '@/store/features/authSlice';
import { useEffect, useState } from 'react';
import { getItem, setItem } from '../utils/localStorageFunctions';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const storedUser = getItem('user');
    const isAuthenticated = getItem('isAuthenticated')

    if (Boolean(isAuthenticated) && storedUser) {
      router.push('/');
    }
  }, []);

  const handleLogin = () => {
    dispatch(login(username));
    setItem('user', username);
    setItem('isAuthenticated', 'true');
    router.push('/');
  }

  return (
    <div className={styles.signup}>
      <div className={styles.cardWrapper}>
        <Card title='Welcome to CodeLeap network!'>
          <Label id='username' text='Please enter your username' className='mb8'></Label>
          <Input id='username' placeholder='John doe' value={username} onChange={(e) => setUsername(e.target.value)}></Input>
          <div className={styles.buttonWrapper}>
            <Button children='ENTER' variant='primary' onClick={handleLogin} disabled={username.length === 0}></Button>
          </div>
        </Card>
      </div>
    </div>
  )
}