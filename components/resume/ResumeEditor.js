'use client'

import { useState, useEffect, useRef } from 'react'
import { useIdentity } from '../../context/IdentityContext'
import { templates, getSectionOrder } from '../templates/TemplateData'
import { GripVertical, Plus, Trash2, ChevronDown, ChevronRight, Download, Image as ImageIcon, X, FileText } from 'lucide-react'

// Dynamically import PDF libraries to avoid initialization issues
let jsPDF, html2canvas
if (typeof window !== 'undefined') {
  import('jspdf').then(module => { jsPDF = module.default })
  import('html2canvas').then(module => { html2canvas = module.default })
}

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
  // ALL HOOKS MUST BE AT THE TOP, IN THE SAME ORDER EVERY RENDER
  const { identity } = useIdentity()
  const [resumeData, setResumeData] = useState(DEFAULT_RESUME_DATA)
  const [draggedItem, setDraggedItem] = useState(null)
  const [dragOverItem, setDragOverItem] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
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

  // Set selected template after hooks
  useEffect(() => {
    const template = templates.find(t => t.id === templateId) || templates[0]
    setSelectedTemplate(template)
  }, [templateId])

  // Load saved data
  useEffect(() => {
    if (typeof window === 'undefined') return
    const savedData = localStorage.getItem(`resume-${templateId}`)
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData))
      } catch (e) {
        console.error('Failed to load saved resume', e)
      }
    }
  }, [templateId])

  // Autosave
  useEffect(() => {
    if (typeof window === 'undefined' || !resumeData) return
    
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

  // Calculate pages
  useEffect(() => {
    if (previewRef.current && typeof window !== 'undefined') {
      const height = previewRef.current.scrollHeight
      const pageHeight = 1123
      const pages = Math.ceil(height / pageHeight)
      setTotalPages(Math.max(1, pages))
    }
  }, [resumeData])

  // Early return if template not loaded
  if (!selectedTemplate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading resume editor...</p>
        </div>
      </div>
    )
  }

  const sectionOrder = getSectionOrder(templateId, identity)

  // Rest of your functions (drag handlers, add/remove, etc.) remain the same...
  // [PASTE ALL YOUR EXISTING FUNCTIONS HERE - handleDragStart, handleDragOver, handleDrop, etc.]

  // PDF Export (with dynamic import)
  const exportToPDF = async () => {
    if (typeof window === 'undefined') return
    
    setIsExporting(true)
    try {
      // Dynamically import if not loaded
      if (!jsPDF) {
        const jspdfModule = await import('jspdf')
        jsPDF = jspdfModule.default
      }
      if (!html2canvas) {
        const html2canvasModule = await import('html2canvas')
        html2canvas = html2canvasModule.default
      }

      const element = document.getElementById('resume-preview')
      if (!element) return

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4'
      })

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        allowTaint: true,
        useCORS: true,
        windowWidth: 800
      })

      const imgData = canvas.toDataURL('image/png')
      const imgWidth = 595
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
      pdf.save(`resume-${templateId}.pdf`)
    } catch (error) {
      console.error('PDF export failed:', error)
      alert('Failed to export PDF. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  // Return your JSX (same as before)
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Your existing JSX here */}
      <div className="lg:w-1/2 p-6 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {/* ... rest of your JSX */}
        </div>
      </div>
    </div>
  )
}
