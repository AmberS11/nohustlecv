// components/ResumePreview.js
import React from 'react';
import styles from '../styles/ResumePreview.module.css';

const ResumePreview = ({ resumeData }) => {
  if (!resumeData) {
    return <div className={styles.previewContainer}>No resume data to display.</div>;
  }

  return (
    <div className={styles.previewContainer}>
      <h2>{resumeData.name}</h2>
      <p>{resumeData.email} | {resumeData.phone}</p>
      <p>{resumeData.location}</p>

      <section>
        <h3>Summary</h3>
        <p>{resumeData.summary}</p>
      </section>

      <section>
        <h3>Experience</h3>
        {resumeData.experience?.map((exp, idx) => (
          <div key={idx}>
            <strong>{exp.role}</strong> at {exp.company}
            <p>{exp.duration}</p>
            <ul>
              {exp.details?.map((point, i) => <li key={i}>{point}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h3>Education</h3>
        {resumeData.education?.map((edu, idx) => (
          <div key={idx}>
            <strong>{edu.degree}</strong> – {edu.institution}
            <p>{edu.year}</p>
          </div>
        ))}
      </section>

      <section>
        <h3>Skills</h3>
        <ul>
          {resumeData.skills?.map((skill, idx) => <li key={idx}>{skill}</li>)}
        </ul>
      </section>
    </div>
  );
};

export default ResumePreview;
