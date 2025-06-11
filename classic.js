// classic.js

import React from "react";
import styles from "../styles/Classic.module.css";

const Classic = ({ name, contact, summary, experience, education, skills }) => {
  return (
    <div className={styles.resume}>
      <h1>{name}</h1>
      <p>{contact}</p>
      <section>
        <h2>Professional Summary</h2>
        <p>{summary}</p>
      </section>
      <section>
        <h2>Experience</h2>
        <ul>
          {experience.map((item, idx) => (
            <li key={idx}>
              <strong>{item.title}</strong> – {item.company} ({item.duration})
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Education</h2>
        <ul>
          {education.map((item, idx) => (
            <li key={idx}>
              {item.degree} – {item.institution} ({item.year})
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Skills</h2>
        <p>{skills.join(", ")}</p>
      </section>
    </div>
  );
};

export default Classic;
