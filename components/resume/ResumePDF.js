'use client'

import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer'

Font.register({
  family: 'Inter',
  src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2'
})

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Inter'
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
  headerText: {
    flex: 1
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4
  },
  title: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 8
  },
  contact: {
    fontSize: 10,
    color: '#6b7280',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 4
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
    fontWeight: 'bold'
  },
  company: {
    fontSize: 11,
    color: '#4b5563',
    marginBottom: 2
  },
  years: {
    fontSize: 10,
    color: '#6b7280'
  },
  description: {
    fontSize: 10,
    color: '#4b5563',
    lineHeight: 1.5
  },
  educationItem: {
    marginBottom: 8
  },
  school: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  degree: {
    fontSize: 11,
    color: '#4b5563'
  },
  year: {
    fontSize: 10,
    color: '#6b7280'
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
    borderRadius: 4
  },
  summary: {
    fontSize: 11,
    color: '#4b5563',
    lineHeight: 1.5,
    marginBottom: 12
  },
  watermark: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    fontSize: 40,
    color: '#f0f0f0',
    transform: 'rotate(-45deg)',
    opacity: 0.3
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
    color: '#9ca3af'
  }
})

// Helper to split content across pages
const splitContentIntoPages = (data, templateId) => {
  const pages = []
  let currentPage = { items: [], height: 0 }
  
  const sectionOrder = {
    'modern-professional': ['summary', 'experience', 'education', 'skills'],
    'creative-edge': ['summary', 'skills', 'experience', 'education'],
    'minimal-elegance': ['summary', 'experience', 'education', 'skills']
  }[templateId] || ['summary', 'experience', 'education', 'skills']

  // Add header to first page
  pages.push({
    type: 'header',
    data: data.personal
  })

  // Distribute sections across pages
  sectionOrder.forEach(sectionType => {
    const sectionHeight = getSectionHeight(data, sectionType)
    if (currentPage.height + sectionHeight > 700) { // Approximate page limit
      pages.push({ type: 'section', data: currentPage.items })
      currentPage = { items: [], height: 0 }
    }
    currentPage.items.push(sectionType)
    currentPage.height += sectionHeight
  })

  if (currentPage.items.length > 0) {
    pages.push({ type: 'section', data: currentPage.items })
  }

  return pages
}

const getSectionHeight = (data, sectionType) => {
  // Approximate heights in points
  switch(sectionType) {
    case 'summary': return 80
    case 'experience': return data.experience.length * 120
    case 'education': return data.education.length * 80
    case 'skills': return 60 + Math.ceil(data.skills.length / 3) * 30
    default: return 50
  }
}

export default function ResumePDF({ data, templateId, isWatermarked = false }) {
  const pages = splitContentIntoPages(data, templateId)

  return (
    <Document>
      {pages.map((page, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.page}>
          
          {/* Header (only on first page) */}
          {pageIndex === 0 && (
            <View style={styles.header}>
              {data.personal.photo && (
                <Image src={data.personal.photo} style={styles.photo} />
              )}
              <View style={styles.headerText}>
                <Text style={styles.name}>{data.personal.name}</Text>
                <Text style={styles.title}>{data.personal.title}</Text>
                <View style={styles.contact}>
                  <Text>{data.personal.email}</Text>
                  <Text>•</Text>
                  <Text>{data.personal.phone}</Text>
                  <Text>•</Text>
                  <Text>{data.personal.location}</Text>
                </View>
              </View>
            </View>
          )}

          {/* Page content */}
          <View style={{ marginTop: pageIndex === 0 ? 20 : 0 }}>
            {page.type === 'section' && page.data.map(sectionType => {
              switch(sectionType) {
                case 'summary':
                  return (
                    <View key="summary">
                      <Text style={styles.sectionTitle}>Professional Summary</Text>
                      <Text style={styles.summary}>{data.summary}</Text>
                    </View>
                  )
                
                case 'experience':
                  return (
                    <View key="experience">
                      <Text style={styles.sectionTitle}>Experience</Text>
                      {data.experience.filter(exp => exp.visible !== false).map((exp, i) => (
                        <View key={i} style={styles.experienceItem}>
                          <View style={styles.experienceHeader}>
                            <Text style={styles.role}>{exp.role}</Text>
                            <Text style={styles.years}>{exp.years}</Text>
                          </View>
                          <Text style={styles.company}>{exp.company}</Text>
                          <Text style={styles.description}>{exp.description}</Text>
                        </View>
                      ))}
                    </View>
                  )
                
                case 'education':
                  return (
                    <View key="education">
                      <Text style={styles.sectionTitle}>Education</Text>
                      {data.education.filter(edu => edu.visible !== false).map((edu, i) => (
                        <View key={i} style={styles.educationItem}>
                          <View style={styles.experienceHeader}>
                            <Text style={styles.school}>{edu.school}</Text>
                            <Text style={styles.year}>{edu.year}</Text>
                          </View>
                          <Text style={styles.degree}>{edu.degree}</Text>
                        </View>
                      ))}
                    </View>
                  )
                
                case 'skills':
                  return (
                    <View key="skills">
                      <Text style={styles.sectionTitle}>Skills</Text>
                      <View style={styles.skills}>
                        {data.skills.map((skill, i) => (
                          <Text key={i} style={styles.skill}>{skill}</Text>
                        ))}
                      </View>
                    </View>
                  )
                
                default:
                  return null
              }
            })}
          </View>

          {/* Watermark */}
          {isWatermarked && (
            <Text style={styles.watermark}>NoHustleCV</Text>
          )}

          {/* Page number */}
          <Text style={styles.pageNumber}>Page {pageIndex + 1}</Text>
        </Page>
      ))}
    </Document>
  )
}
