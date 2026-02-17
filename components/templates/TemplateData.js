// Template definitions for NoHustleCV
// Phase 2.2 — MVP with 3 templates

export const templates = [
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    description: 'Clean, ATS-optimized, corporate-ready. Perfect for most roles.',
    color: 'from-blue-500 to-cyan-500',
    previewColor: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    isPremium: false, // Free tier gets this one
    identities: {
      student: {
        sectionOrder: ['education', 'projects', 'experience', 'skills'],
        tip: 'Highlight your GPA and academic projects.'
      },
      professional: {
        sectionOrder: ['summary', 'experience', 'education', 'skills'],
        tip: 'Add metrics to show impact.'
      },
      career_switcher: {
        sectionOrder: ['summary', 'skills', 'experience', 'education'],
        tip: 'Emphasize transferable skills.'
      }
    }
  },
  {
    id: 'creative-edge',
    name: 'Creative Edge',
    description: 'Bold, visual, perfect for designers and marketers.',
    color: 'from-purple-500 to-pink-500',
    previewColor: 'bg-gradient-to-br from-purple-500 to-pink-500',
    isPremium: true, // Locked for free users
    identities: {
      student: {
        sectionOrder: ['projects', 'education', 'skills', 'experience'],
        tip: 'Showcase your best projects first.'
      },
      professional: {
        sectionOrder: ['portfolio', 'experience', 'skills', 'education'],
        tip: 'Link to your portfolio or case studies.'
      },
      career_switcher: {
        sectionOrder: ['skills', 'projects', 'experience', 'education'],
        tip: 'Show how your creative skills apply to new roles.'
      }
    }
  },
  {
    id: 'minimal-elegance',
    name: 'Minimal Elegance',
    description: 'Timeless, sophisticated. Ideal for executives and academics.',
    color: 'from-gray-700 to-gray-900',
    previewColor: 'bg-gradient-to-br from-gray-700 to-gray-900',
    isPremium: true, // Locked for free users
    identities: {
      student: {
        sectionOrder: ['education', 'research', 'experience', 'skills'],
        tip: 'Highlight academic achievements and research.'
      },
      professional: {
        sectionOrder: ['summary', 'experience', 'leadership', 'education'],
        tip: 'Focus on leadership and strategic impact.'
      },
      career_switcher: {
        sectionOrder: ['summary', 'skills', 'experience', 'education'],
        tip: 'Bridge your past experience with new goals.'
      }
    }
  }
]

// Helper function to get template by ID
export const getTemplateById = (id) => {
  return templates.find(template => template.id === id) || templates[0]
}

// Helper to get section order for identity
export const getSectionOrder = (templateId, identity) => {
  const template = getTemplateById(templateId)
  return template.identities[identity]?.sectionOrder || 
         template.identities.professional.sectionOrder // fallback
}
