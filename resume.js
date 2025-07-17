import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Resume.module.css';

export default function ResumePage() {
  const router = useRouter();
  const [resumeFile, setResumeFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
      setError('');
    } else {
      setError('Please upload a valid PDF file.');
    }
  };

  const handleUpload = () => {
    if (!resumeFile) {
      setError('No file selected.');
      return;
    }

    // Simulate upload
    setTimeout(() => {
      setUploadSuccess(true);
      router.push('/atsScore'); // Redirect to ATS Score after upload
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Upload Your Resume</h1>
      <p className={styles.subtext}>
        Upload your resume (PDF only) to optimize it using our ATS scanner.
      </p>

      <input type="file" accept=".pdf" onChange={handleFileChange} />
      {error && <p className={styles.error}>{error}</p>}

      <button className={styles.uploadButton} onClick={handleUpload}>
        Upload & Analyze
      </button>

      {uploadSuccess && <p className={styles.success}>Upload successful!</p>}
    </div>
  );
}
