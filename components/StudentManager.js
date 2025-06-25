import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Search } from 'lucide-react'
import { LocalStorage } from '../lib/storage'
import { GRADE_OPTIONS } from '../lib/constants'
import { formatDate } from '../lib/utils'
import toast from 'react-hot-toast'

export default function StudentManager({ selectedStudent, onSelectStudent }) {
  const [students, setStudents] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddingStudent, setIsAddingStudent] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)

  useEffect(() => {
    setStudents(LocalStorage.getStudents())
  }, [])

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddStudent = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    try {
      const newStudent = LocalStorage.addStudent({
        name: formData.get('name'),
        grade: formData.get('grade'),
        joinDate: formData.get('joinDate'),
        notes: formData.get('notes') || ''
      })
      setStudents(prev => [...prev, newStudent])
      setIsAddingStudent(false)
      e.target.reset()
      toast.success('生徒が追加されました')
    } catch (error) {
      toast.error('生徒の追加に失敗しました')
    }
  }

  const handleEditStudent = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    try {
      const updates = {
        name: formData.get('name'),
        grade: formData.get('grade'),
        joinDate: formData.get('joinDate'),
        notes: formData.get('notes') || ''
      }
      LocalStorage.updateStudent(editingStudent.id, updates)
      setStudents(prev => prev.map(s => 
        s.id === editingStudent.id ? { ...s, ...updates } : s
      ))
      setEditingStudent(null)
      toast.success('生徒情報が更新されました')
    } catch (error) {
      toast.error('生徒情報の更新に失敗しました')
    }
  }

  const handleDeleteStudent = (student) => {
    if (confirm(`${student.name}を削除してもよろしいですか？`)) {
      try {
        LocalStorage.deleteStudent(student.id)
        setStudents(prev => prev.filter(s => s.id !== student.id))
        if (selectedStudent?.id === student.id) {
          onSelectStudent(null)
        }
        toast.success('生徒が削除されました')
      } catch (error) {
        toast.error('生徒の削除に失敗しました')
      }
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">生徒管理</h2>
        <button
          onClick={() => setIsAddingStudent(true)}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Plus size={16} />
          追加
        </button>
      </div>

      {/* 検索 */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="text"
          placeholder="生徒名で検索..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 生徒追加・編集フォーム */}
      {(isAddingStudent || editingStudent) && (
        <form 
          onSubmit={editingStudent ? handleEditStudent : handleAddStudent}
          className="mb-4 p-4 bg-gray-50 rounded-lg"
        >
          <h3 className="font-medium mb-3">
            {editingStudent ? '生徒編集' : '新しい生徒'}
          </h3>
          <div className="grid grid-cols-1 gap-3">
            <input
              name="name"
              placeholder="生徒名"
              defaultValue={editingStudent?.name}
              className="px-3 py-2 border rounded"
              required
            />
            <select
              name="grade"
              defaultValue={editingStudent?.grade}
              className="px-3 py-2 border rounded"
              required
            >
              <option value="">学年を選択</option>
              {GRADE_OPTIONS.map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
            <input
              name="joinDate"
              type="date"
              defaultValue={editingStudent?.joinDate?.split('T')[0] || new Date().toISOString().split('T')[0]}
              className="px-3 py-2 border rounded"
              required
            />
            <textarea
              name="notes"
              placeholder="メモ（保護者連絡先など）"
              defaultValue={editingStudent?.notes}
              className="px-3 py-2 border rounded"
              rows={2}
            />
          </div>
          <div className="flex gap-2 mt-3">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {editingStudent ? '更新' : '追加'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAddingStudent(false)
                setEditingStudent(null)
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              キャンセル
            </button>
          </div>
        </form>
      )}

      {/* 生徒リスト */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredStudents.map(student => (
          <div
            key={student.id}
            className={`p-3 rounded-lg cursor-pointer border-l-4 ${
              selectedStudent?.id === student.id
                ? 'bg-blue-50 border-blue-500'
                : 'bg-gray-50 border-transparent hover:bg-gray-100'
            }`}
            onClick={() => onSelectStudent(student)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{student.name}</h3>
                <p className="text-sm text-gray-600">{student.grade}</p>
                <p className="text-xs text-gray-400">
                  入会: {formatDate(student.joinDate)}
                </p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setEditingStudent(student)
                  }}
                  className="p-1 text-gray-400 hover:text-blue-600"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteStudent(student)
                  }}
                  className="p-1 text-gray-400 hover:text-red-600"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          {searchTerm ? '該当する生徒が見つかりません' : '生徒がまだ登録されていません'}
        </p>
      )}
    </div>
  )
}
