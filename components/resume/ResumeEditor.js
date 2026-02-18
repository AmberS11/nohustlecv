'use client'

import { useState, useEffect } from 'react'
import { useIdentity } from '../../context/IdentityContext'
import { templates, getSectionOrder } from '../templates/TemplateData'
import { GripVertical, Plus, Trash2, Save } from 'lucide-react'

export default function ResumeEditor({ templateId = 'modern-professional' }) {
  const { identity } = useIdentity()
  
  // Load from localStorage or use defaults
  const loadSavedData = () => {
    const saved = localStorage.getItem('resumeData')
    if (saved) {
      return JSON.parse(saved)
    }
    return {
      personal: {
        name: 'John Doe',
        title: 'Software Engineer',
        email: 'john@example.com',
        phone: '+91 98765 43210',
        location: 'Mumbai, India'
      },
      summary: 'Experienced software engineer with a passion for building beautiful products.',
      experience: [
        { id: 'exp1', company: 'Tech Corp', role: 'Senior Developer', years: '2022-Present', description: 'Led team of 5 developers building cloud infrastructure.' },
        { id: 'exp2', company: 'Startup Inc', role: 'Developer', years: '2020-2022', description: 'Built mobile apps using React Native.' }
      ],
      education: [
        { id: 'edu1', school: 'University of Mumbai', degree: 'B.Tech Computer Science', year: '2020', grade: '8.9 CGPA' }
      ],
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'UI/UX']
    }
  }

  const [resumeData, setResumeData] = useState(loadSavedData())
  const [lastSaved, setLastSaved] = useState(null)
  const [draggedItem, setDraggedItem] = useState(null)
  const [dragOverItem, setDragOverItem] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState(
    templates.find(t => t.id === templateId) || templates[0]
  )

  // Autosave whenever data changes
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData))
    setLastSaved(new Date().toLocaleTimeString())
  }, [resumeData])

  useEffect(() => {
    const template = templates.find(t => t.id === templateId) || templates[0]
    setSelectedTemplate(template)
  }, [templateId])

  const sectionOrder = getSectionOrder(templateId, identity)

  // Reset to default
  const resetToDefault = () => {
    localStorage.removeItem('resumeData')
    window.location.reload()
  }

  // Drag handlers
  const handleDragStart = (e, section, index) => {
    setDraggedItem({ section, index })
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e, section, index) => {
    e.preventDefault()
    setDragOverItem({ section, index })
  }

  const handleDrop = (e, targetSection, targetIndex) => {
    e.preventDefault()
    
    if (!draggedItem) return
    if (draggedItem.section !== targetSection) return

    const newData = { ...resumeData }
    const items = [...newData[draggedItem.section]]
    const [removed] = items.splice(draggedItem.index, 1)
    items.splice(targetIndex, 0, removed)
    
    newData[draggedItem.section] = items
    setResumeData(newData)
    setDraggedItem(null)
    setDragOverItem(null)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
    setDragOverItem(null)
  }

  // Add/remove handlers
  const addExperience = () => {
    const newExp = {
      id: `exp${Date.now()}`,
      company: 'New Company',
      role: 'New Role',
      years: '2024-Present',
      description: 'Add description here...'
    }
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, newExp]
    })
  }

  const addEducation = () => {
    const newEdu = {
      id: `edu${Date.now()}`,
      school: 'New School',
      degree: 'New Degree',
      year: '2024',
      grade: 'Grade'
    }
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, newEdu]
    })
  }

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, 'New Skill']
    })
  }

  const removeItem = (section, index) => {
    const newData = { ...resumeData }
    newData[section] = newData[section].filter((_, i) => i !== index)
    setResumeData(newData)
  }

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
            {resumeData.experience.map((exp, idx) => (
              <div 
                key={exp.id}
                draggable
                onDragStart={(e) => handleDragStart(e, 'experience', idx)}
                onDragOver={(e) => handleDragOver(e, 'experience', idx)}
                onDrop={(e) => handleDrop(e, 'experience', idx)}
                onDragEnd={handleDragEnd}
                className={`mb-4 p-3 border rounded-lg cursor-move transition-all ${
                  draggedItem?.section === 'experience' && draggedItem?.index === idx 
                    ? 'opacity-50 border-primary' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                } ${
                  dragOverItem?.section === 'experience' && dragOverItem?.index === idx
                    ? 'border-2 border-primary'
                    : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-gray-400" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => {
                              const newData = { ...resumeData }
                              newData.experience[idx].role = e.target.value
                              setResumeData(newData)
                            }}
                            className="font-medium bg-transparent border-b border-transparent hover:border-gray-300 focus:border-primary outline-none"
                          />
                          <input
                            type="text"
                            value={exp.years}
                            onChange={(e) => {
                              const newData = { ...resumeData }
                              newData.experience[idx].years = e.target.value
                              setResumeData(newData)
                            }}
                            className="text-sm text-gray-500 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-primary outline-none w-32 text-right"
                          />
                        </div>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            const newData = { ...resumeData }
                            newData.experience[idx].company = e.target.value
                            setResumeData(newData)
                          }}
                          className="text-sm text-gray-600 dark:text-gray-400 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-primary outline-none w-full"
                        />
                      </div>
                    </div>
                    <textarea
                      value={exp.description}
                      onChange={(e) => {
                        const newData = { ...resumeData }
                        newData.experience[idx].description = e.target.value
                        setResumeData(newData)
                      }}
                      className="mt-2 w-full text-sm bg-transparent border border-gray-200 dark:border-gray-700 rounded p-2 focus:border-primary outline-none"
                      rows="2"
                    />
                  </div>
                  <button 
                    onClick={() => removeItem('experience', idx)}
                    className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={addExperience}
              className="mt-2 flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Experience
            </button>
          </div>
        )
      
      case 'education':
        return (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Education</h3>
            {resumeData.education.map((edu, idx) => (
              <div 
                key={edu.id}
                draggable
                onDragStart={(e) => handleDragStart(e, 'education', idx)}
                onDragOver={(e) => handleDragOver(e, 'education', idx)}
                onDrop={(e) => handleDrop(e, 'education', idx)}
                onDragEnd={handleDragEnd}
                className={`mb-4 p-3 border rounded-lg cursor-move transition-all ${
                  draggedItem?.section === 'education' && draggedItem?.index === idx 
                    ? 'opacity-50 border-primary' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                } ${
                  dragOverItem?.section === 'education' && dragOverItem?.index === idx
                    ? 'border-2 border-primary'
                    : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-gray-400" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <input
                            type="text"
                            value={edu.school}
                            onChange={(e) => {
                              const newData = { ...resumeData }
                              newData.education[idx].school = e.target.value
                              setResumeData(newData)
                            }}
                            className="font-medium bg-transparent border-b border-transparent hover:border-gray-300 focus:border-primary outline-none"
                          />
                          <input
                            type="text"
                            value={edu.year}
                            onChange={(e) => {
                              const newData = { ...resumeData }
                              newData.education[idx].year = e.target.value
                              setResumeData(newData)
                            }}
                            className="text-sm text-gray-500 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-primary outline-none w-20 text-right"
                          />
                        </div>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => {
                            const newData = { ...resumeData }
                            newData.education[idx].degree = e.target.value
                            setResumeData(newData)
                          }}
                          className="text-sm text-gray-600 dark:text-gray-400 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-primary outline-none w-full"
                        />
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeItem('education', idx)}
                    className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={addEducation}
              className="mt-2 flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Education
            </button>
          </div>
        )
      
      case 'skills':
        return (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, idx) => (
                <div key={idx} className="relative group">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm flex items-center gap-1">
                    <GripVertical className="w-3 h-3 text-gray-400 cursor-move" />
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => {
                        const newData = { ...resumeData }
                        newData.skills[idx] = e.target.value
                        setResumeData(newData)
                      }}
                      className="bg-transparent border-none outline-none w-20 text-center"
                    />
                    <button 
                      onClick={() => removeItem('skills', idx)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={addSkill}
              className="mt-2 flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Skill
            </button>
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
          
          {/* Header with save indicator */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-dark dark:text-light">Edit Your Resume</h2>
            {lastSaved && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Save className="w-3 h-3" />
                <span>Saved {lastSaved}</span>
              </div>
            )}
          </div>
          
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
            <p className="text-xs text-gray-500 mt-1">
              Drag sections with <GripVertical className="inline w-3 h-3" /> to reorder
            </p>
          </div>

          {/* Reset button */}
          <button
            onClick={resetToDefault}
            className="mt-4 text-sm text-gray-500 hover:text-primary transition-colors"
          >
            Reset to default
          </button>
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
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 relative">
            
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

            {/* Template-specific styling */}
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
