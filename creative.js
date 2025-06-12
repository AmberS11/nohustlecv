// creative.js

import React from 'react';
import styles from '../styles/Creative.module.css';

const Creative = ({ name, contact, summary, skills, experience, education }) => {
  return (
    <div className={styles.resume}>
      <header className={styles.header}>
        <h1>{name}</h1>
        <p>{contact}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.title}>About Me</h2>
        <p>{summary}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.title}>Expertise</h2>
        <div className={styles.skills}>
          {skills?.map((skill, index) => (
            <span key={index} className={styles.skill}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.title}>Experience</h2>
        {experience?.map((exp, index) => (
          <div key={index} className={styles.entry}>
            <h3>{exp.role}</h3>
            <h4>{exp.company} • {exp.duration}</h4>
            <p>{exp.description}</p>
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.title}>Education</h2>
        {education?.map((edu, index) => (
          <div key={index} className={styles.entry}>
            <h3>{edu.degree}</h3>
            <h4>{edu.institution} • {edu.year}</h4>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Creative;
