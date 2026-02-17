'use client'

import { useState, useEffect } from 'react'
import { useIdentity } from '../../context/IdentityContext'
import { templates, getSectionOrder } from '../templates/TemplateData'

export default function ResumeEditor({ templateId = 'modern-professional' }) {
  const { identity } = useIdentity()
  const [resumeData, setResumeData] = useState({
    personal: {
      name: 'John Doe',
      title: 'Software Engineer',
      email: 'john@example.com',
      phone: '+91 98765 43210',
      location: 'Mumbai, India'
    },
    summary: 'Experienced software engineer with a passion for building beautiful products.',
    experience: [
      { id: 1, company: 'Tech Corp', role: 'Senior Developer', years: '2022-Present', description: 'Led team of 5 developers...' },
      { id: 2, company: 'Startup Inc', role: 'Developer', years: '2020-2022', description: 'Built mobile apps...' }
    ],
    education: [
      { id: 1, school: 'University of Mumbai', degree: 'B.Tech Computer Science', year: '2020', grade: '8.9 CGPA' }
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'UI/UX']
  })

  const [selectedTemplate, setSelectedTemplate] = useState(
    templates.find(t => t.id === templateId) || templates[0]
  )

  useEffect(() => {
    const template = templates.find(t => t.id === templateId) || templates[0]
    setSelectedTemplate(template)
  }, [templateId])

  const sectionOrder = getSectionOrder(templateId, identity)

  // Render section based on type
  const renderSection = (sectionType) => {
    switch(sectionType) {
      case 'summary':
        return (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Summary</h3>
            <p className="text-gray-600 dark:text-gray-400">{resumeData.summary}</p>
          </div>
        )
      
      case 'experience':
        return (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Experience</h3>
            {resumeData.experience.map(exp => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{exp.role}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-500">{exp.years}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        )
      
      case 'education':
        return (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Education</h3>
            {resumeData.education.map(edu => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{edu.school}</h4>
                  <span className="text-sm text-gray-500 dark:text-gray-500">{edu.year}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{edu.degree} • {edu.grade}</p>
              </div>
            ))}
          </div>
        )
      
      case 'skills':
        return (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      
      {/* Left Panel - Editor */}
      <div className="lg:w-1/2 p-6 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-dark dark:text-light">Edit Your Resume</h2>
          
          {/* Personal Info */}
          <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <h3 className="font-semibold mb-4 text-dark dark:text-light">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text"
                value={resumeData.personal.name}
                onChange={(e) => setResumeData({...resumeData, personal: {...resumeData.personal, name: e.target.value}})}
                className="col-span-2 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                placeholder="Full Name"
              />
              <input 
                type="text"
                value={resumeData.personal.title}
                onChange={(e) => setResumeData({...resumeData, personal: {...resumeData.personal, title: e.target.value}})}
                className="col-span-2 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                placeholder="Professional Title"
              />
              <input 
                type="email"
                value={resumeData.personal.email}
                onChange={(e) => setResumeData({...resumeData, personal: {...resumeData.personal, email: e.target.value}})}
                className="col-span-2 md:col-span-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                placeholder="Email"
              />
              <input 
                type="tel"
                value={resumeData.personal.phone}
                onChange={(e) => setResumeData({...resumeData, personal: {...resumeData.personal, phone: e.target.value}})}
                className="col-span-2 md:col-span-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                placeholder="Phone"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <h3 className="font-semibold mb-4 text-dark dark:text-light">Professional Summary</h3>
            <textarea
              value={resumeData.summary}
              onChange={(e) => setResumeData({...resumeData, summary: e.target.value})}
              rows="3"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              placeholder="Write a brief summary..."
            />
          </div>

          {/* Section order indicator */}
          <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-sm text-dark dark:text-light">
              <span className="font-medium">Identity-based order:</span> {' '}
              {sectionOrder.map((s, i) => (
                <span key={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                  {i < sectionOrder.length - 1 ? ' → ' : ''}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Preview */}
      <div className="lg:w-1/2 p-6 bg-gray-50 dark:bg-gray-800 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-dark dark:text-light">Preview</h2>
            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
              {selectedTemplate.name}
            </span>
          </div>
          
          {/* Resume Preview Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-dark dark:text-light">
                {resumeData.personal.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                {resumeData.personal.title}
              </p>
              <div className="flex justify-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-500">
                <span>{resumeData.personal.email}</span>
                <span>•</span>
                <span>{resumeData.personal.phone}</span>
                <span>•</span>
                <span>{resumeData.personal.location}</span>
              </div>
            </div>

            {/* Dynamic Sections based on identity */}
            <div className="space-y-6">
              {sectionOrder.map(sectionType => renderSection(sectionType))}
            </div>

            {/* Template-specific styling (simulated) */}
            {selectedTemplate.id === 'creative-edge' && (
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-500 to-pink-500" />
            )}
            {selectedTemplate.id === 'minimal-elegance' && (
              <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-4 mt-4 text-center text-sm text-gray-500">
                — Minimal Elegance —
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
