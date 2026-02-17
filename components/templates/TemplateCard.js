'use client'

import { Lock, CheckCircle } from 'lucide-react'

export default function TemplateCard({ 
  template, 
  isSelected, 
  onSelect,
  userIdentity = 'professional'
}) {
  
  // Get section order preview based on identity
  const sectionOrder = template.identities[userIdentity]?.sectionOrder || 
                      template.identities.professional.sectionOrder
  
  // Simple visual representation of section order
  const renderPreview = () => {
    return (
      <div className="space-y-2 p-4">
        {/* Header preview */}
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-6 h-6 rounded-full ${template.previewColor}`} />
          <div className="h-3 w-24 bg-gray-300 dark:bg-gray-600 rounded" />
        </div>
        
        {/* Section previews based on identity order */}
        {sectionOrder.slice(0, 3).map((section, i) => (
          <div key={i} className="space-y-1">
            <div className="h-2 w-16 bg-gray-400 dark:bg-gray-500 rounded" />
            <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-2 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        ))}
        
        {/* Visual indicator that more sections exist */}
        <div className="flex justify-center mt-2">
          <div className="h-1 w-12 bg-gray-300 dark:bg-gray-600 rounded" />
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={() =>  onSelect(template.id)}
      className={`
        group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden
        border-2 transition-all duration-300 cursor-pointer
        ${isSelected 
          ? 'border-primary shadow-xl scale-[1.02]' 
          : 'border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1'
        }
        ${template.isPremium ? 'opacity-90' : 'opacity-100'}
      `}
    >
      {/* Premium overlay if locked */}
      {template.isPremium && (
        <div className="absolute inset-0 bg-black/60 dark:bg-black/70 backdrop-blur-[2px] z-10 flex items-center justify-center">
          <div className="text-center">
            <Lock className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-white font-medium text-sm">Premium Template</p>
            <p className="text-white/80 text-xs mt-1">Upgrade to unlock</p>
          </div>
        </div>
      )}

      {/* Selected checkmark */}
      {isSelected && !template.isPremium && (
        <div className="absolute top-3 right-3 z-20">
          <CheckCircle className="w-6 h-6 text-primary bg-white rounded-full" />
        </div>
      )}

      {/* Template preview */}
      <div className="aspect-[4/5] bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        {renderPreview()}
      </div>

      {/* Template info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-dark dark:text-light">
            {template.name}
          </h3>
          {template.isPremium && (
            <span className="text-xs px-2 py-1 bg-gradient-to-r from-primary to-secondary text-white rounded-full">
              PRO
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {template.description}
        </p>
        
        {/* Identity indicator (subtle) */}
        <div className="mt-3 flex items-center gap-1">
          <span className="text-xs text-gray-500 dark:text-gray-500">
            Optimized for
          </span>
          <span className="text-xs font-medium text-primary">
            {userIdentity === 'student' && 'Students'}
            {userIdentity === 'professional' && 'Professionals'}
            {userIdentity === 'career_switcher' && 'Career Switchers'}
          </span>
        </div>
      </div>

      {/* Hover gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  )
}
