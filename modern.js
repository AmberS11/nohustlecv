// modern.js

import React from "react";
import styles from "../styles/Modern.module.css";

const Modern = ({ name, contact, summary, experience, education, skills }) => {
  return (
    <div className={styles.resume}>
      <header className={styles.header}>
        <h1>{name}</h1>
        <p>{contact}</p>
      </header>

      <section className={styles.section}>
        <h2>Summary</h2>
        <p>{summary}</p>
      </section>

      <section className={styles.section}>
        <h2>Experience</h2>
        {experience.map((item, idx) => (
          <div key={idx} className={styles.item}>
            <strong>{item.title}</strong> – {item.company} ({item.duration})
            <p>{item.description}</p>
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <h2>Education</h2>
        {education.map((item, idx) => (
          <div key={idx} className={styles.item}>
            {item.degree}, {item.institution} ({item.year})
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <h2>Skills</h2>
        <p>{skills.join(" • ")}</p>
      </section>
    </div>
  );
};

export default Modern;
