import React, { useState } from "react";
import ResumePreview from "./ResumePreview";
import templates from "../data/templates";
import "../styles/ResumeBuilder.css";

function ResumeBuilder() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
    selectedTemplate: "classic",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTemplateChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      selectedTemplate: e.target.value,
    }));
  };

  return (
    <div className="resume-builder">
      <form className="resume-form">
        <h2>Build Your Resume</h2>

        <label>
          Full Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>

        <label>
          Phone:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </label>

        <label>
          Summary:
          <textarea name="summary" value={formData.summary} onChange={handleChange} />
        </label>

        <label>
          Experience:
          <textarea name="experience" value={formData.experience} onChange={handleChange} />
        </label>

        <label>
          Education:
          <textarea name="education" value={formData.education} onChange={handleChange} />
        </label>

        <label>
          Skills:
          <textarea name="skills" value={formData.skills} onChange={handleChange} />
        </label>

        <label>
          Select Template:
          <select value={formData.selectedTemplate} onChange={handleTemplateChange}>
            {Object.keys(templates).map((key) => (
              <option key={key} value={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </option>
            ))}
          </select>
        </label>
      </form>

      <ResumePreview formData={formData} />
    </div>
  );
}

export default ResumeBuilder;
