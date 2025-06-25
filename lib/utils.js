import { format, parseISO, isValid } from 'date-fns'
import { ja } from 'date-fns/locale'

export function formatDate(date, formatStr = 'yyyy年MM月dd日') {
  if (!date) return ''
  
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  if (!isValid(dateObj)) return ''
  
  return format(dateObj, formatStr, { locale: ja })
}

export function formatTime(time) {
  if (!time) return ''
  return time.slice(0, 5) // HH:MM format
}

export function getUnderstandingDisplay(level) {
  const displays = {
    1: { stars: '⭐', emoji: '😰', color: 'text-red-500' },
    2: { stars: '⭐⭐', emoji: '😅', color: 'text-orange-500' },
    3: { stars: '⭐⭐⭐', emoji: '😐', color: 'text-yellow-500' },
    4: { stars: '⭐⭐⭐⭐', emoji: '😊', color: 'text-blue-500' },
    5: { stars: '⭐⭐⭐⭐⭐', emoji: '😍', color: 'text-green-500' }
  }
  return displays[level] || displays[3]
}

export function calculateProgress(records) {
  if (!records.length) return { percentage: 0, completed: 0, total: 0 }
  
  const completed = records.filter(r => r.progressStatus === 'completed').length
  const percentage = Math.round((completed / records.length) * 100)
  
  return { percentage, completed, total: records.length }
}

export function getStudentStats(student, records) {
  const studentRecords = records.filter(r => r.studentId === student.id)
  const progress = calculateProgress(studentRecords)
  
  const totalHours = studentRecords.reduce((sum, record) => {
    return sum + (record.durationMinutes || 0)
  }, 0)
  
  const averageUnderstanding = studentRecords.length > 0
    ? Math.round(
        studentRecords.reduce((sum, record) => sum + (record.understandingLevel || 0), 0) / studentRecords.length * 10
      ) / 10
    : 0
  
  const coursesCompleted = new Set(
    studentRecords
      .filter(r => r.progressStatus === 'completed')
      .map(r => r.courseType)
  ).size
  
  return {
    ...progress,
    totalHours: Math.round(totalHours / 60 * 10) / 10, // 時間単位
    totalMinutes: totalHours,
    averageUnderstanding,
    coursesCompleted,
    lastLessonDate: studentRecords.length > 0 
      ? Math.max(...studentRecords.map(r => new Date(r.lessonDate).getTime()))
      : null
  }
}

export function exportDataAsCSV(records, students) {
  const csvData = records.map(record => {
    const student = students.find(s => s.id === record.studentId)
    return {
      '生徒名': student ? student.name : '不明',
      '学年': student ? student.grade : '不明',
      '実施日': formatDate(record.lessonDate, 'yyyy-MM-dd'),
      'コース': record.courseType,
      'レッスン': record.lessonName,
      '開始時間': record.startTime,
      '所要時間（分）': record.durationMinutes,
      '進捗状況': record.progressStatus,
      '理解度': record.understandingLevel,
      'メモ': record.notes || '',
      '登録日時': formatDate(record.createdAt, 'yyyy-MM-dd HH:mm')
    }
  })

  if (csvData.length === 0) {
    csvData.push({
      '生徒名': '',
      '学年': '',
      '実施日': '',
      'コース': '',
      'レッスン': '',
      '開始時間': '',
      '所要時間（分）': '',
      '進捗状況': '',
      '理解度': '',
      'メモ': '',
      '登録日時': ''
    })
  }

  const headers = Object.keys(csvData[0])
  const csvContent = [
    headers.join(','),
    ...csvData.map(row => 
      headers.map(header => `"${(row[header] || '').toString().replace(/"/g, '""')}"`).join(',')
    )
  ].join('\n')

  const blob = new Blob(['\ufeff' + csvContent], { 
    type: 'text/csv;charset=utf-8;' 
  })
  downloadBlob(blob, `学習記録_${getCurrentDateString()}.csv`)
}

export function exportDataAsJSON(data, filename = 'classroom_data') {
  const blob = new Blob([JSON.stringify(data, null, 2)], { 
    type: 'application/json' 
  })
  downloadBlob(blob, `${filename}_${getCurrentDateString()}.json`)
}

function downloadBlob(blob, filename) {
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}

function getCurrentDateString() {
  return new Date().toISOString().split('T')[0]
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
}
