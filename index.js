// pages/index.js

import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>NoHustleCV | Walk Through the Door</title>
        <meta
          name="description"
          content="Every resume builder helps you get in the door. But NoHustleCV? We help you walk through it."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to NoHustleCV</h1>
        <p className={styles.tagline}>
          Every resume builder helps you get in the door.
          <br />
          <strong>But NoHustleCV? We help you walk through it.</strong>
        </p>

        <div className={styles.buttons}>
          <Link href="/resume-builder" className={styles.button}>
            Start Building Your Resume
          </Link>
          <Link href="/pricing" className={styles.outlineButton}>
            View Plans & Pricing
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} NoHustleCV. All rights reserved.
      </footer>
    </div>
  );
}
