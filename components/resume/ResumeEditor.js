'use client'

import { useState, useEffect, useRef } from 'react'
import { useIdentity } from '../../context/IdentityContext'
import { templates, getSectionOrder } from '../templates/TemplateData'
import { GripVertical, Plus, Trash2, Save, Upload, Undo2, Redo2, Eye, EyeOff } from 'lucide-react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import ResumePDF from './ResumePDF'

export default function ResumeEditor({ templateId = 'modern-professional' }) {
  const { identity } = useIdentity()
  const [isPro] = useState(false)
  const fileInputRef = useRef(null)
  
  // History for undo/redo
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  
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
        location: 'Mumbai, India',
        photo: null // Add photo field
      },
      summary: 'Experienced software engineer with a passion for building beautiful products.',
      experience: [
        { id: 'exp1', company: 'Tech Corp', role: 'Senior Developer', years: '2022-Present', description: 'Led team of 5 developers building cloud infrastructure.', visible: true },
        { id: 'exp2', company: 'Startup Inc', role: 'Developer', years: '2020-2022', description: 'Built mobile apps using React Native.', visible: true }
      ],
      education: [
        { id: 'edu1', school: 'University of Mumbai', degree: 'B.Tech Computer Science', year: '2020', grade: '8.9 CGPA', visible: true }
      ],
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'UI/UX'],
      customSections: []
    }
  }

  const [resumeData, setResumeData] = useState(loadSavedData())
  const [lastSaved, setLastSaved] = useState(null)
  const [draggedItem, setDraggedItem] = useState(null)
  const [dragOverItem, setDragOverItem] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState(
    templates.find(t => t.id === templateId) || templates[0]
  )
  const [hiddenSections, setHiddenSections] = useState({})

  // Save to history on data change (for undo/redo)
  useEffect(() => {
    if (historyIndex === -1 || JSON.stringify(history[historyIndex]) !== JSON.stringify(resumeData)) {
      const newHistory = history.slice(0, historyIndex + 1)
      newHistory.push(resumeData)
      setHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
    }
  }, [resumeData])

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

  // Undo/Redo functions
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setResumeData(history[historyIndex - 1])
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setResumeData(history[historyIndex + 1])
    }
  }

  // Photo upload handler
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setResumeData({
          ...resumeData,
          personal: {
            ...resumeData.personal,
            photo: reader.result
          }
        })
      }
      reader.readAsDataURL(file)
    }
  }

  // Hide/Show section toggle
  const toggleSectionVisibility = (sectionType, index = null) => {
    if (index !== null) {
      // Toggle individual item (experience, education)
      const newData = { ...resumeData }
      newData[sectionType][index].visible = !newData[sectionType][index].visible
      setResumeData(newData)
    } else {
      // Toggle entire section type
      setHiddenSections(prev => ({
        ...prev,
        [sectionType]: !prev[sectionType]
      }))
    }
  }

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
      description: 'Add description here...',
      visible: true
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
      grade: 'Grade',
      visible: true
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

  const addCustomSection = () => {
    const newSection = {
      id: `custom${Date.now()}`,
      title: 'New Section',
      content: 'Add your content here...',
      visible: true
    }
    setResumeData({
      ...resumeData,
      customSections: [...(resumeData.customSections || []), newSection]
    })
  }

  const removeItem = (section, index) => {
    const newData = { ...resumeData }
    newData[section] = newData[section].filter((_, i) => i !== index)
    setResumeData(newData)
  }

  const removeCustomSection = (index) => {
    const newData = { ...resumeData }
    newData.customSections = newData.customSections.filter((_, i) => i !== index)
    setResumeData(newData)
  }

  // Render section based on type
  const renderSection = (sectionType) => {
    if (hiddenSections[sectionType]) return null

    switch(sectionType) {
      case 'summary':
        return (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Summary</h3>
              <button
                onClick={() => toggleSectionVisibility('summary')}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <EyeOff className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-400">{resumeData.summary}</p>
          </div>
        )
      
      case 'experience':
        return (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Experience</h3>
              <button
                onClick={() => toggleSectionVisibility('experience')}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <EyeOff className="w-4 h-4" />
              </button>
            </div>
            {resumeData.experience.filter(exp => exp.visible).map((exp, idx) => (
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
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleSectionVisibility('experience', idx)}
                      className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      title={exp.visible ? 'Hide' : 'Show'}
                    >
                      {exp.visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={() => removeItem('experience', idx)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
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
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Education</h3>
              <button
                onClick={() => toggleSectionVisibility('education')}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <EyeOff className="w-4 h-4" />
              </button>
            </div>
            {resumeData.education.filter(edu => edu.visible).map((edu, idx) => (
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
                    <div className="flex items-center gap-1 mt-2">
                      <button
                        onClick={() => toggleSectionVisibility('education', idx)}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        title={edu.visible ? 'Hide' : 'Show'}
                      >
                        {edu.visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button 
                        onClick={() => removeItem('education', idx)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Skills</h3>
                <button
                  onClick={() => toggleSectionVisibility('skills')}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <EyeOff className="w-4 h-4" />
                </button>
              </div>
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
            
            {/* Header with save indicator and undo/redo */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-dark dark:text-light">Edit Your Resume</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={undo}
                  disabled={historyIndex <= 0}
                  className={`p-2 rounded-lg ${
                    historyIndex <= 0 
                      ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  title="Undo"
                >
                  <Undo2 className="w-4 h-4" />
                </button>
                <button
                  onClick={redo}
                  disabled={historyIndex >= history.length - 1}
                  className={`p-2 rounded-lg ${
                    historyIndex >= history.length - 1
                      ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  title="Redo"
                >
                  <Redo2 className="w-4 h-4" />
                </button>
                {lastSaved && (
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Save className="w-3 h-3" />
                    <span>Saved {lastSaved}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Personal Info with Photo Upload */}
            <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <h3 className="font-semibold mb-4 text-dark dark:text-light">Personal Information</h3>
              
              {/* Photo Upload */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  {resumeData.personal.photo ? (
                    <img 
                      src={resumeData.personal.photo} 
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover border-2 border-primary"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                      <Upload className="w-6 h-6" />
                    </div>
                  )}
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-0 right-0 p-1 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                    title="Upload photo"
                  >
                    <Upload className="w-4 h-4" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Upload a professional photo (optional)
                  </p>
                  {resumeData.personal.photo && (
                    <button
                      onClick={() => {
                        setResumeData({
                          ...resumeData,
                          personal: { ...resumeData.personal, photo: null }
                        })
                      }}
                      className="text-xs text-red-500 hover:text-red-600 mt-1"
                    >
                      Remove photo
                    </button>
                  )}
                </div>
              </div>

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
                <input 
                  type="text"
                  value={resumeData.personal.location}
                  onChange={(e) => setResumeData({...resumeData, personal: {...resumeData.personal, location: e.target.value}})}
                  className="col-span-2 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  placeholder="Location"
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

            {/* Dynamic Sections */}
            {sectionOrder.map(sectionType => renderSection(sectionType))}

            {/* Custom Sections */}
            {resumeData.customSections?.map((section, idx) => (
              <div key={section.id} className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex justify-between items-center mb-3">
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => {
                      const newData = { ...resumeData }
                      newData.customSections[idx].title = e.target.value
                      setResumeData(newData)
                    }}
                    className="font-semibold bg-transparent border-b border-transparent hover:border-gray-300 focus:border-primary outline-none"
                    placeholder="Section Title"
                  />
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        const newData = { ...resumeData }
                        newData.customSections[idx].visible = !newData.customSections[idx].visible
                        setResumeData(newData)
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {section.visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => removeCustomSection(idx)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {section.visible && (
                  <textarea
                    value={section.content}
                    onChange={(e) => {
                      const newData = { ...resumeData }
                      newData.customSections[idx].content = e.target.value
                      setResumeData(newData)
                    }}
                    rows="3"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                    placeholder="Add your content here..."
                  />
                )}
              </div>
            ))}

            {/* Add Custom Section Button */}
            <button
              onClick={addCustomSection}
              className="mb-6 flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Custom Section
            </button>

            {/* Reset button */}
            <button
              onClick={resetToDefault}
              className="mt-4 text-sm text-gray-500 hover:text-primary transition-colors"
            >
              Reset to default
            </button>

            {/* Export PDF */}
            <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <h3 className="font-semibold mb-3 text-dark dark:text-light">Export Resume</h3>
              <PDFDownloadLink
                document={<ResumePDF data={resumeData} templateId={templateId} isWatermarked={!isPro} />}
                fileName={`${resumeData.personal.name.replace(/\s+/g, '_')}_Resume.pdf`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                {({ loading }) => (
                  <>
                    {loading ? 'Generating PDF...' : 'Download PDF'}
                    {!isPro && <span className="text-xs ml-2 opacity-80">(Watermarked)</span>}
                  </>
                )}
              </PDFDownloadLink>
              {!isPro && (
                <p className="text-xs text-gray-500 mt-2">
                  Free version includes watermark. Upgrade to PRO for clean exports.
                </p>
              )}
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
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 relative min-h-[842px]">
              
              {/* Header with Photo */}
              <div className="flex items-center gap-6 mb-8">
                {resumeData.personal.photo && (
                  <img 
                    src={resumeData.personal.photo} 
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                  />
                )}
                <div className={resumeData.personal.photo ? 'flex-1' : 'w-full text-center'}>
                  <h1 className="text-3xl font-bold text-dark dark:text-light">
                    {resumeData.personal.name}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                    {resumeData.personal.title}
                  </p>
                  <div className="flex justify-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-500 flex-wrap">
                    <span>{resumeData.personal.email}</span>
                    <span>•</span>
                    <span>{resumeData.personal.phone}</span>
                    <span>•</span>
                    <span>{resumeData.personal.location}</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Sections based on identity */}
              <div className="space-y-6">
                {sectionOrder.map(sectionType => {
                  if (hiddenSections[sectionType]) return null
                  return renderSection(sectionType)
                })}
                
                {/* Custom Sections in Preview */}
                {resumeData.customSections?.filter(s => s.visible).map(section => (
                  <div key={section.id} className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Page break indicator for multi-page (visual only) */}
              {resumeData.experience.length > 2 && (
                <div className="mt-8 pt-4 border-t-2 border-dashed border-gray-300 dark:border-gray-600 text-center text-sm text-gray-400">
                  Page 1 • Continues on next page
                </div>
              )}

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

            {/* Multi-page indicator (second page preview) */}
            {resumeData.experience.length > 2 && (
              <div className="mt-4 p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 opacity-50">
                <p className="text-center text-sm text-gray-500">Page 2 (Preview continues)</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
