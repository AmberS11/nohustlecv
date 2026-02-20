'use client'

import { useState } from 'react'
import { Copy, Check, Download, Edit2, Save, X } from 'lucide-react'

export default function CoverLetterResult({ letter, onSave, onRegenerate }) {
  const [copied, setCopied] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedLetter, setEditedLetter] = useState(letter)

  const handleCopy = () => {
    navigator.clipboard.writeText(editedLetter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([editedLetter], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cover-letter.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleSave = () => {
    onSave(editedLetter)
    setIsEditing(false)
  }

  if (!letter) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 mt-8">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-dark dark:text-light">
          Your AI-Generated Cover Letter
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title={isEditing ? 'Cancel edit' : 'Edit'}
          >
            {isEditing ? <X className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
          </button>
          <button
            onClick={handleCopy}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative"
            title="Copy to clipboard"
          >
            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
          </button>
          <button
            onClick={handleDownload}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Download as text file"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Letter Content */}
      {isEditing ? (
        <div className="space-y-4">
          <textarea
            value={editedLetter}
            onChange={(e) => setEditedLetter(e.target.value)}
            rows="15"
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 font-mono text-sm focus:ring-2 focus:ring-primary outline-none"
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
            {letter}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <p className="text-xs text-gray-500">
          AI-generated content. Please review and personalize before sending.
        </p>
        <button
          onClick={onRegenerate}
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Regenerate
        </button>
      </div>
    </div>
  )
}
