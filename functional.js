// functional.js

import React from 'react';
import styles from '../styles/Functional.module.css';

const Functional = ({ name, contact, summary, skills, experience, education }) => {
  return (
    <div className={styles.resume}>
      <h1 className={styles.name}>{name}</h1>
      <p className={styles.contact}>{contact}</p>

      <section className={styles.section}>
        <h2>Professional Summary</h2>
        <p>{summary}</p>
      </section>

      <section className={styles.section}>
        <h2>Key Skills</h2>
        <ul className={styles.skills}>
          {skills?.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Experience Highlights</h2>
        {experience?.map((item, i) => (
          <div key={i} className={styles.item}>
            <strong>{item.role}</strong> – {item.company} ({item.duration})
            <p>{item.description}</p>
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <h2>Education</h2>
        {education?.map((edu, i) => (
          <div key={i} className={styles.item}>
            {edu.degree}, {edu.institution} ({edu.year})
          </div>
        ))}
      </section>
    </div>
  );
};

export default Functional;
