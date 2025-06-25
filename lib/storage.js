import { generateId } from './utils'

export class LocalStorage {
  static STUDENTS_KEY = 'classroom_students_v2'
  static RECORDS_KEY = 'classroom_records_v2'
  static SETTINGS_KEY = 'classroom_settings_v2'

  // 基本的なストレージ操作
  static get(key) {
    if (typeof window === 'undefined') return null
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error('Storage get error:', error)
      return null
    }
  }

  static set(key, value) {
    if (typeof window === 'undefined') return false
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error('Storage set error:', error)
      return false
    }
  }

  // 生徒管理
  static getStudents() {
    return this.get(this.STUDENTS_KEY) || []
  }

  static saveStudents(students) {
    return this.set(this.STUDENTS_KEY, students)
  }

  static addStudent(studentData) {
    const students = this.getStudents()
    const newStudent = {
      id: generateId(),
      ...studentData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    students.push(newStudent)
    this.saveStudents(students)
    return newStudent
  }

  static updateStudent(id, updates) {
    const students = this.getStudents()
    const index = students.findIndex(s => s.id === id)
    if (index !== -1) {
      students[index] = { 
        ...students[index], 
        ...updates, 
        updatedAt: new Date().toISOString() 
      }
      this.saveStudents(students)
      return students[index]
    }
    return null
  }

  static deleteStudent(id) {
    const students = this.getStudents().filter(s => s.id !== id)
    this.saveStudents(students)
    
    // 関連する学習記録も削除
    const records = this.getRecords().filter(r => r.studentId !== id)
    this.saveRecords(records)
    
    return true
  }

  // 学習記録管理
  static getRecords(studentId = null) {
    const records = this.get(this.RECORDS_KEY) || []
    return studentId ? records.filter(r => r.studentId === studentId) : records
  }

  static saveRecords(records) {
    return this.set(this.RECORDS_KEY, records)
  }

  static addRecord(recordData) {
    const records = this.getRecords()
    const newRecord = {
      id: generateId(),
      ...recordData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    records.push(newRecord)
    this.saveRecords(records)
    return newRecord
  }

  static updateRecord(id, updates) {
    const records = this.getRecords()
    const index = records.findIndex(r => r.id === id)
    if (index !== -1) {
      records[index] = { 
        ...records[index], 
        ...updates, 
        updatedAt: new Date().toISOString() 
      }
      this.saveRecords(records)
      return records[index]
    }
    return null
  }

  static deleteRecord(id) {
    const records = this.getRecords().filter(r => r.id !== id)
    this.saveRecords(records)
    return true
  }

  // データエクスポート・インポート
  static exportAllData() {
    return {
      students: this.getStudents(),
      records: this.getRecords(),
      exportDate: new Date().toISOString(),
      version: '2.0'
    }
  }

  static importAllData(data) {
    try {
      if (!data.students || !data.records) {
        throw new Error('不正なデータ形式です')
      }

      this.saveStudents(data.students)
      this.saveRecords(data.records)
      
      return true
    } catch (error) {
      console.error('Import error:', error)
      throw error
    }
  }

  // データクリア
  static clearAllData() {
    if (typeof window === 'undefined') return false
    
    localStorage.removeItem(this.STUDENTS_KEY)
    localStorage.removeItem(this.RECORDS_KEY)
    localStorage.removeItem(this.SETTINGS_KEY)
    
    return true
  }
}
