'use client'

import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica'
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    objectFit: 'cover'
  },
  photoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    flex: 1
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    fontFamily: 'Helvetica-Bold'
  },
  title: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 8,
    fontFamily: 'Helvetica'
  },
  contact: {
    fontSize: 10,
    color: '#6b7280',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    fontFamily: 'Helvetica'
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 4,
    fontFamily: 'Helvetica-Bold'
  },
  experienceItem: {
    marginBottom: 12
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4
  },
  role: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold'
  },
  company: {
    fontSize: 11,
    color: '#4b5563',
    marginBottom: 2,
    fontFamily: 'Helvetica'
  },
  years: {
    fontSize: 10,
    color: '#6b7280',
    fontFamily: 'Helvetica'
  },
  description: {
    fontSize: 10,
    color: '#4b5563',
    lineHeight: 1.5,
    fontFamily: 'Helvetica'
  },
  educationItem: {
    marginBottom: 8
  },
  school: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold'
  },
  degree: {
    fontSize: 11,
    color: '#4b5563',
    fontFamily: 'Helvetica'
  },
  year: {
    fontSize: 10,
    color: '#6b7280',
    fontFamily: 'Helvetica'
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6
  },
  skill: {
    fontSize: 10,
    backgroundColor: '#f3f4f6',
    padding: '4 8',
    borderRadius: 4,
    fontFamily: 'Helvetica'
  },
  summary: {
    fontSize: 11,
    color: '#4b5563',
    lineHeight: 1.5,
    marginBottom: 12,
    fontFamily: 'Helvetica'
  },
  watermark: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    fontSize: 40,
    color: '#f0f0f0',
    transform: 'rotate(-45deg)',
    opacity: 0.3,
    fontFamily: 'Helvetica'
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
    color: '#9ca3af',
    fontFamily: 'Helvetica'
  }
})

export default function ResumePDF({ data, templateId, isWatermarked = false }) {
  // Calculate section order based on template
  const sectionOrder = {
    'modern-professional': ['summary', 'experience', 'education', 'skills'],
    'creative-edge': ['summary', 'skills', 'experience', 'education'],
    'minimal-elegance': ['summary', 'experience', 'education', 'skills']
  }[templateId] || ['summary', 'experience', 'education', 'skills']

  // Helper to render photo if exists
  const renderPhoto = () => {
    if (data.personal.photo) {
      return (
        <Image 
          src={data.personal.photo} 
          style={styles.photo}
          cache={false}
        />
      )
    }
    return (
      <View style={styles.photoPlaceholder}>
        <Text style={{ fontSize: 24, color: '#999' }}>📷</Text>
      </View>
    )
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Header with Photo */}
        <View style={styles.header}>
          {renderPhoto()}
          <View style={styles.headerText}>
            <Text style={styles.name}>{data.personal.name || 'Your Name'}</Text>
            <Text style={styles.title}>{data.personal.title || 'Professional'}</Text>
            <View style={styles.contact}>
              <Text>{data.personal.email || 'email@example.com'}</Text>
              <Text>•</Text>
              <Text>{data.personal.phone || '+91 00000 00000'}</Text>
              <Text>•</Text>
              <Text>{data.personal.location || 'India'}</Text>
            </View>
          </View>
        </View>

        {/* Dynamic Sections */}
        {sectionOrder.map((sectionType, index) => {
          switch(sectionType) {
            case 'summary':
              return (
                <View key={`summary-${index}`}>
                  <Text style={styles.sectionTitle}>Professional Summary</Text>
                  <Text style={styles.summary}>{data.summary || 'Add your professional summary'}</Text>
                </View>
              )
            
            case 'experience':
              return (
                <View key={`experience-${index}`}>
                  <Text style={styles.sectionTitle}>Experience</Text>
                  {data.experience?.filter(exp => exp.visible !== false).map((exp, i) => (
                    <View key={i} style={styles.experienceItem}>
                      <View style={styles.experienceHeader}>
                        <Text style={styles.role}>{exp.role || 'Role'}</Text>
                        <Text style={styles.years}>{exp.years || 'Year'}</Text>
                      </View>
                      <Text style={styles.company}>{exp.company || 'Company'}</Text>
                      <Text style={styles.description}>{exp.description || 'Description'}</Text>
                    </View>
                  ))}
                </View>
              )
            
            case 'education':
              return (
                <View key={`education-${index}`}>
                  <Text style={styles.sectionTitle}>Education</Text>
                  {data.education?.filter(edu => edu.visible !== false).map((edu, i) => (
                    <View key={i} style={styles.educationItem}>
                      <View style={styles.experienceHeader}>
                        <Text style={styles.school}>{edu.school || 'School'}</Text>
                        <Text style={styles.year}>{edu.year || 'Year'}</Text>
                      </View>
                      <Text style={styles.degree}>{edu.degree || 'Degree'}</Text>
                    </View>
                  ))}
                </View>
              )
            
            case 'skills':
              return (
                <View key={`skills-${index}`}>
                  <Text style={styles.sectionTitle}>Skills</Text>
                  <View style={styles.skills}>
                    {data.skills?.map((skill, i) => (
                      <Text key={i} style={styles.skill}>{skill}</Text>
                    ))}
                  </View>
                </View>
              )
            
            default:
              return null
          }
        })}

        {/* Watermark for free users */}
        {isWatermarked && (
          <Text style={styles.watermark}>NoHustleCV</Text>
        )}

        {/* Page number */}
        <Text style={styles.pageNumber} fixed>Page 1</Text>
      </Page>
    </Document>
  )
}
