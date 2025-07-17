import { useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase/config';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import styles from '../styles/Auth.module.css';

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/dashboard'); // Redirect to dashboard after sign-up
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'Google signup failed.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Create your account</h1>

      <form onSubmit={handleSignup} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
      </form>

      <p className={styles.or}>OR</p>

      <button onClick={handleGoogleSignup} className={styles.googleButton}>
        Sign up with Google
      </button>

      {error && <p className={styles.error}>{error}</p>}

      <p className={styles.linkText}>
        Already have an account?{' '}
        <a href="/login" className={styles.link}>
          Log in
        </a>
      </p>
    </div>
  );
}
