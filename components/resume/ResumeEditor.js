'use client'

import { useState, useEffect, useRef } from 'react'
import { useIdentity } from '../../context/IdentityContext'
import { templates, getSectionOrder } from '../templates/TemplateData'
import { GripVertical, Plus, Trash2, ChevronDown, ChevronRight, Download, Image as ImageIcon, X, FileText } from 'lucide-react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const DEFAULT_RESUME_DATA = {
  personal: {
    name: 'John Doe',
    title: 'Software Engineer',
    email: 'john@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, India',
    profileImage: null
  },
  summary: 'Experienced software engineer with a passion for building beautiful products.',
  experience: [
    { id: 'exp1', company: 'Tech Corp', role: 'Senior Developer', years: '2022-Present', description: 'Led team of 5 developers building cloud infrastructure.' },
    { id: 'exp2', company: 'Startup Inc', role: 'Developer', years: '2020-2022', description: 'Built mobile apps using React Native.' }
  ],
  education: [
    { id: 'edu1', school: 'University of Mumbai', degree: 'B.Tech Computer Science', year: '2020', grade: '8.9 CGPA' }
  ],
  skills: ['JavaScript', 'React', 'Node.js', 'Python', 'UI/UX'],
  customSections: []
}

export default function ResumeEditor({ templateId = 'modern-professional' }) {
  const { identity } = useIdentity()
  const [resumeData, setResumeData] = useState(DEFAULT_RESUME_DATA)
  const [draggedItem, setDraggedItem] = useState(null)
  const [dragOverItem, setDragOverItem] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState(
    templates.find(t => t.id === templateId) || templates[0]
  )
  const [saveStatus, setSaveStatus] = useState('saved')
  const [lastSaved, setLastSaved] = useState(null)
  const [showResetModal, setShowResetModal] = useState(false)
  const [collapsedSections, setCollapsedSections] = useState({})
  const [isExporting, setIsExporting] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showPageModal, setShowPageModal] = useState(false)
  const fileInputRef = useRef(null)
  const previewRef = useRef(null)

  useEffect(() => {
    const template = templates.find(t => t.id === templateId) || templates[0]
    setSelectedTemplate(template)
    
    // Load saved data from localStorage
    const savedData = localStorage.getItem(`resume-${templateId}`)
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData))
      } catch (e) {
        console.error('Failed to load saved resume', e)
      }
    }
  }, [templateId])

  // Autosave to localStorage
  useEffect(() => {
    if (!resumeData) return
    
    setSaveStatus('saving')
    
    const timeout = setTimeout(() => {
      try {
        localStorage.setItem(`resume-${templateId}`, JSON.stringify(resumeData))
        setSaveStatus('saved')
        setLastSaved(new Date())
      } catch (e) {
        console.error('Failed to save resume', e)
        setSaveStatus('error')
      }
    }, 500)
    
    return () => clearTimeout(timeout)
  }, [resumeData, templateId])

  // Calculate total pages based on content height
  useEffect(() => {
    if (previewRef.current) {
      const height = previewRef.current.scrollHeight
      const pageHeight = 1123 // A4 height in pixels at 96 DPI
      const pages = Math.ceil(height / pageHeight)
      setTotalPages(Math.max(1, pages))
    }
  }, [resumeData, sectionOrder])

  const sectionOrder = getSectionOrder(templateId, identity)

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

  const addCustomSection = () => {
    const newSection = {
      id: `custom${Date.now()}`,
      title: 'Custom Section',
      content: 'Add your content here...'
    }
    setResumeData({
      ...resumeData,
      customSections: [...resumeData.customSections, newSection]
    })
  }

  const removeItem = (section, index) => {
    const newData = { ...resumeData }
    if (section === 'customSections') {
      newData[section] = newData[section].filter((_, i) => i !== index)
    } else {
      newData[section] = newData[section].filter((_, i) => i !== index)
    }
    setResumeData(newData)
  }

  const handleReset = () => {
    setResumeData(DEFAULT_RESUME_DATA)
    localStorage.setItem(`resume-${templateId}`, JSON.stringify(DEFAULT_RESUME_DATA))
    setShowResetModal(false)
    setLastSaved(new Date())
  }

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // Image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setResumeData({
          ...resumeData,
          personal: {
            ...resumeData.personal,
            profileImage: reader.result
          }
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setResumeData({
      ...resumeData,
      personal: {
        ...resumeData.personal,
        profileImage: null
      }
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // PDF Export with multiple pages
  const exportToPDF = async () => {
    setIsExporting(true)
    try {
      const element = document.getElementById('resume-preview')
      if (!element) return

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4'
      })

      const pageHeight = 1123 // A4 height in pixels
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        allowTaint: true,
        useCORS: true,
        windowWidth: 800,
        windowHeight: pageHeight * totalPages
      })

      const imgData = canvas.toDataURL('image/png')
      const imgWidth = 595 // A4 width in pixels
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      
      let heightLeft = imgHeight
      let position = 0
      let page = 1

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft > 0) {
        position = position - pageHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
        page++
      }

      pdf.save(`resume-${templateId}.pdf`)
    } catch (error) {
      console.error('PDF export failed:', error)
      alert('Failed to export PDF. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  // Page navigation
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      if (previewRef.current) {
        previewRef.current.scrollTo({
          top: (page - 1) * 1123,
          behavior: 'smooth'
        })
      }
    }
  }

  // Render section based on type
  const renderSection = (sectionType) => {
    const isCollapsed = collapsedSections[sectionType]

    switch(sectionType) {
      case 'summary':
        return (
          <div className="mb-6">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection(sectionType)}
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Summary</h3>
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
            {!isCollapsed && (
              <p className="text-gray-600 dark:text-gray-400 mt-2">{resumeData.summary}</p>
            )}
          </div>
        )
      
      case 'experience':
        return (
          <div className="mb-6">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection(sectionType)}
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Experience</h3>
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
            {!isCollapsed && (
              <>
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
              </>
            )}
          </div>
        )
      
      case 'education':
        return (
          <div className="mb-6">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection(sectionType)}
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Education</h3>
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
            {!isCollapsed && (
              <>
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
              </>
            )}
          </div>
        )
      
      case 'skills':
        return (
          <div className="mb-6">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection(sectionType)}
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Skills</h3>
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
            {!isCollapsed && (
              <>
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
              </>
            )}
          </div>
        )
      
      case 'custom':
        return (
          <div className="mb-6">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection('custom')}
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Custom Sections</h3>
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
            {!isCollapsed && (
              <>
                {resumeData.customSections.map((section, idx) => (
                  <div key={section.id} className="mb-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => {
                          const newData = { ...resumeData }
                          newData.customSections[idx].title = e.target.value
                          setResumeData(newData)
                        }}
                        className="font-medium bg-transparent border-b border-transparent hover:border-gray-300 focus:border-primary outline-none"
                      />
                      <button 
                        onClick={() => removeItem('customSections', idx)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <textarea
                      value={section.content}
                      onChange={(e) => {
                        const newData = { ...resumeData }
                        newData.customSections[idx].content = e.target.value
                        setResumeData(newData)
                      }}
                      className="w-full text-sm bg-transparent border border-gray-200 dark:border-gray-700 rounded p-2 focus:border-primary outline-none"
                      rows="3"
                    />
                  </div>
                ))}
                <button
                  onClick={addCustomSection}
                  className="mt-2 flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Custom Section
                </button>
              </>
            )}
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
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-dark dark:text-light">Edit Your Resume</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={exportToPDF}
                disabled={isExporting}
                className="text-sm bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-1"
              >
                <Download className="w-4 h-4" />
                {isExporting ? 'Exporting...' : 'Export PDF'}
              </button>
              <button
                onClick={() => setShowResetModal(true)}
                className="text-sm text-gray-500 hover:text-primary transition-colors"
              >
                ↺ Reset
              </button>
              {saveStatus === 'saving' && (
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  Saving...
                </span>
              )}
              {saveStatus === 'saved' && lastSaved && (
                <span className="text-sm text-green-500">
                  ✓ Saved {lastSaved.toLocaleTimeString()}
                </span>
              )}
              {saveStatus === 'error' && (
                <span className="text-sm text-red-500">
                  ⚠ Save failed
                </span>
              )}
            </div>
          </div>
          
          {/* Personal Info with Image Upload */}
          <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <h3 className="font-semibold mb-4 text-dark dark:text-light">Personal Information</h3>
            
            {/* Profile Image */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                {resumeData.personal.profileImage ? (
                  <div className="relative">
                    <img 
                      src={resumeData.personal.profileImage} 
                      alt="Profile" 
                      className="w-20 h-20 rounded-full object-cover border-2 border-primary"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors border-2 border-dashed border-gray-400"
                  >
                    <ImageIcon className="w-8 h-8 text-gray-500" />
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div className="text-sm text-gray-500">
                <p>Upload a profile photo</p>
                <p className="text-xs">JPG, PNG, GIF (optional)</p>
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

          {/* Page navigation in editor */}
          <div className="mb-4 flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm bg-white dark:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                ← Prev
              </button>
              <button
                onClick={() => setShowPageModal(true)}
                className="px-3 py-1 text-sm bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                Jump to
              </button>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm bg-white dark:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                Next →
              </button>
            </div>
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
          
          {/* Resume Preview Card with scroll for multi-page */}
          <div 
            ref={previewRef}
            id="resume-preview"
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 relative overflow-y-auto"
            style={{ maxHeight: '800px' }}
          >
            
            {/* Header with Profile Image */}
            <div className="text-center mb-8">
              {resumeData.personal.profileImage && (
                <img 
                  src={resumeData.personal.profileImage} 
                  alt={resumeData.personal.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-primary"
                />
              )}
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

            {/* Dynamic Sections based on identity */}
            <div className="space-y-6">
              {sectionOrder.map(sectionType => renderSection(sectionType))}
              {/* Always render custom sections at the end */}
              {renderSection('custom')}
            </div>

            {/* Page break indicators */}
            {totalPages > 1 && (
              <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 text-center">
                  {totalPages} page{totalPages > 1 ? 's' : ''} • Scroll to see all
                </p>
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
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md p-8 relative">
            <button 
              onClick={() => setShowResetModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">↺</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-dark dark:text-light">
                Reset to Default?
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                This will erase all your changes and restore the original resume content. This cannot be undone.
              </p>
              
              <div className="space-y-3">
                <button 
                  onClick={handleReset}
                  className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                >
                  Yes, Reset to Default
                </button>
                <button 
                  onClick={() => setShowResetModal(false)}
                  className="w-full border border-gray-300 dark:border-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Page Jump Modal */}
      {showPageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md p-8 relative">
            <button 
              onClick={() => setShowPageModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-dark dark:text-light">
                Jump to Page
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Your resume has {totalPages} page{totalPages > 1 ? 's' : ''}
              </p>
              
              <div className="flex gap-2 justify-center mb-6">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      goToPage(i + 1)
                      setShowPageModal(false)
                    }}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      currentPage === i + 1
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => setShowPageModal(false)}
                className="w-full border border-gray-300 dark:border-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
