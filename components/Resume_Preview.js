import React from 'react';
import styles from './styles/ResumePreview.module.css';

const ResumePreview = ({ resumeData }) => {
  if (!resumeData) return <p className={styles.message}>No data to preview</p>;

  const { name, contact, summary, experience, education, skills } = resumeData;

  return (
    <div className={styles.previewContainer}>
      <h2 className={styles.name}>{name}</h2>
      <p className={styles.contact}>{contact}</p>

      <section className={styles.section}>
        <h3>Summary</h3>
        <p>{summary}</p>
      </section>

      <section className={styles.section}>
        <h3>Experience</h3>
        {experience?.map((item, index) => (
          <div key={index} className={styles.item}>
            <strong>{item.role}</strong> at {item.company} ({item.duration})
            <p>{item.description}</p>
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <h3>Education</h3>
        {education?.map((item, index) => (
          <div key={index} className={styles.item}>
            {item.degree}, {item.institution} ({item.year})
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <h3>Skills</h3>
        <p>{skills?.join(', ')}</p>
      </section>
    </div>
  );
};

export default ResumePreview;
