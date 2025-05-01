import { Card } from '@/components/card/card';
import styles from './signup.module.css';
import { Input } from '@/components/input/input';
import { Label } from '@/components/label/label';
import { Button } from '@/components/button/button';

export default function SignUp() {
  return (
    <div className={styles.signup}>
      <div className={styles.cardWrapper}>
        <Card title='Welcome to CodeLeap network!'>
          <Label id='username' text='Please enter your username' className='mb8'></Label>
          <Input id='username' placeholder='John doe'></Input>
          <div className={styles.buttonWrapper}>
            <Button children='ENTER' variant='primary'></Button>
          </div>
        </Card>
      </div>
    </div>
  )
}