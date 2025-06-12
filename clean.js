// clean.js
import React from 'react';
import styles from '../styles/Clean.module.css';

const CleanResume = ({ data }) => {
  const {
    name,
    email,
    phone,
    summary,
    education,
    experience,
    skills,
    projects,
  } = data;

  return (
    <div className={styles.resume}>
      <header className={styles.header}>
        <h1>{name}</h1>
        <p>{email} | {phone}</p>
      </header>

      <section className={styles.section}>
        <h2>Professional Summary</h2>
        <p>{summary}</p>
      </section>

      <section className={styles.section}>
        <h2>Education</h2>
        <ul>
          {education?.map((edu, index) => (
            <li key={index}>
              <strong>{edu.degree}</strong>, {edu.institution} ({edu.year})
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Experience</h2>
        <ul>
          {experience?.map((exp, index) => (
            <li key={index}>
              <strong>{exp.role}</strong> - {exp.company} ({exp.duration})
              <p>{exp.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Skills</h2>
        <p>{skills?.join(', ')}</p>
      </section>

      <section className={styles.section}>
        <h2>Projects</h2>
        <ul>
          {projects?.map((proj, index) => (
            <li key={index}>
              <strong>{proj.name}</strong>: {proj.description}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default CleanResume;
