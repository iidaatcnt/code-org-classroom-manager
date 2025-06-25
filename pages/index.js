import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Dashboard from '../components/Dashboard'
import StudentManager from '../components/StudentManager'
import { LocalStorage } from '../lib/storage'
import { COURSE_TYPES, LESSONS_BY_COURSE, PROGRESS_STATUS } from '../lib/constants'
import { formatDate, exportDataAsCSV, exportDataAsJSON } from '../lib/utils'
import { Save, Download, Upload } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Home() {
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [records, setRecords] = useState([])
  const [isAddingRecord, setIsAddingRecord] = useState(false)

  useEffect(() => {
    if (selectedStudent) {
      setRecords(LocalStorage.getRecords(selectedStudent.id))
    }
  }, [selectedStudent])

  const handleAddRecord = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    try {
      const newRecord = LocalStorage.addRecord({
        studentId: selectedStudent.id,
        courseType: formData.get('courseType'),
        lessonName: formData.get('lessonName'),
        lessonDate: formData.get('lessonDate'),
        startTime: formData.get('startTime'),
        durationMinutes: parseInt(formData.get('durationMinutes')),
        progressStatus: formData.get('progressStatus'),
        understandingLevel: parseInt(formData.get('understandingLevel')),
        notes: formData.get('notes') || ''
      })
      setRecords(prev => [newRecord, ...prev])
      setIsAddingRecord(false)
      e.target.reset()
      toast.success('学習記録が追加されました')
    } catch (error) {
      toast.error('学習記録の追加に失敗しました')
    }
  }

  const handleDeleteRecord = (recordId) => {
    if (confirm('この学習記録を削除してもよろしいですか？')) {
      try {
        LocalStorage.deleteRecord(recordId)
        setRecords(prev => prev.filter(r => r.id !== recordId))
        toast.success('学習記録が削除されました')
      } catch (error) {
        toast.error('学習記録の削除に失敗しました')
      }
    }
  }

  const handleExportCSV = () => {
    try {
      const allRecords = LocalStorage.getRecords()
      const allStudents = LocalStorage.getStudents()
      exportDataAsCSV(allRecords, allStudents)
      toast.success('CSVファイルをエクスポートしました')
    } catch (error) {
      toast.error('エクスポートに失敗しました')
    }
  }

  const handleExportJSON = () => {
    try {
      const data = LocalStorage.exportAllData()
      exportDataAsJSON(data, 'classroom_backup')
      toast.success('バックアップファイルをエクスポートしました')
    } catch (error) {
      toast.error('エクスポートに失敗しました')
    }
  }

  const handleImportJSON = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result)
          LocalStorage.importAllData(data)
          toast.success('データの復元が完了しました')
          window.location.reload()
        } catch (error) {
          toast.error('復元に失敗しました: ' + error.message)
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <Layout title="ダッシュボード - Code.org学習管理システム" activeTab="dashboard">
      <div className="space-y-6">
        {/* ヘッダー */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                🎓 Code.org学習管理システム
              </h1>
              <p className="text-gray-600">データベース不要版 - 完全無料</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                <Download size={16} />
                CSV出力
              </button>
              <button
                onClick={handleExportJSON}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <Download size={16} />
                バックアップ
              </button>
              <label className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 cursor-pointer">
                <Upload size={16} />
                復元
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportJSON}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <StudentManager
              selectedStudent={selectedStudent}
              onSelectStudent={setSelectedStudent}
            />
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">
                  学習履歴 {selectedStudent && `- ${selectedStudent.name}`}
                </h2>
                {selectedStudent && !isAddingRecord && (
                  <button
                    onClick={() => setIsAddingRecord(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    記録追加
                  </button>
                )}
              </div>

              {!selectedStudent ? (
                <p className="text-center text-gray-500 py-8">
                  生徒を選択してください
                </p>
              ) : (
                <>
                  {isAddingRecord && (
                    <form onSubmit={handleAddRecord} className="mb-6 p-4 bg-green-50 rounded-lg">
                      <h3 className="font-medium mb-4">新しい学習記録</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">コース</label>
                          <select name="courseType" className="w-full p-2 border rounded" required>
                            <option value="">選択してください</option>
                            {Object.entries(COURSE_TYPES).map(([value, info]) => (
                              <option key={value} value={value}>{info.label}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">実施日</label>
                          <input
                            name="lessonDate"
                            type="date"
                            defaultValue={new Date().toISOString().split('T')[0]}
                            className="w-full p-2 border rounded"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">開始時間</label>
                          <input
                            name="startTime"
                            type="time"
                            className="w-full p-2 border rounded"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">所要時間（分）</label>
                          <input
                            name="durationMinutes"
                            type="number"
                            min="15"
                            max="180"
                            defaultValue="60"
                            className="w-full p-2 border rounded"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">進捗状況</label>
                          <select name="progressStatus" className="w-full p-2 border rounded" required>
                            <option value="">選択してください</option>
                            {Object.entries(PROGRESS_STATUS).map(([value, info]) => (
                              <option key={value} value={value}>{info.label}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">理解度（1-5）</label>
                          <select name="understandingLevel" className="w-full p-2 border rounded" required>
                            <option value="">選択してください</option>
                            <option value="5">5 - とても良く理解できた</option>
                            <option value="4">4 - 良く理解できた</option>
                            <option value="3">3 - 普通</option>
                            <option value="2">2 - 少し難しかった</option>
                            <option value="1">1 - とても難しかった</option>
                          </select>
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium mb-1">レッスン名</label>
                        <input
                          name="lessonName"
                          placeholder="例: マインクラフト: 海の冒険"
                          className="w-full p-2 border rounded"
                          required
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium mb-1">メモ</label>
                        <textarea
                          name="notes"
                          rows={3}
                          className="w-full p-2 border rounded"
                          placeholder="生徒の様子、気づいたこと、次回の課題など..."
                        />
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button
                          type="submit"
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          <Save size={16} />
                          保存
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsAddingRecord(false)}
                          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                          キャンセル
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">実施日</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">コース</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">時間</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">状況</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">理解度</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        {records.map(record => {
                          const courseInfo = COURSE_TYPES[record.courseType]
                          const statusInfo = PROGRESS_STATUS[record.progressStatus]
                          
                          return (
                            <tr key={record.id} className="border-t">
                              <td className="px-4 py-2 text-sm">
                                {formatDate(record.lessonDate)}
                              </td>
                              <td className="px-4 py-2 text-sm">
                                {courseInfo?.label || record.courseType}
                              </td>
                              <td className="px-4 py-2 text-sm">
                                {record.startTime} ({record.durationMinutes}分)
                              </td>
                              <td className="px-4 py-2">
                                <span className={`px-2 py-1 text-xs rounded-full ${statusInfo?.color || 'bg-gray-100 text-gray-800'}`}>
                                  {statusInfo?.label || record.progressStatus}
                                </span>
                              </td>
                              <td className="px-4 py-2 text-sm">
                                {'⭐'.repeat(record.understandingLevel || 0)}
                              </td>
                              <td className="px-4 py-2">
                                <button
                                  onClick={() => handleDeleteRecord(record.id)}
                                  className="text-red-600 hover:text-red-800 text-sm"
                                >
                                  削除
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                    {records.length === 0 && (
                      <p className="text-center text-gray-500 py-8">
                        学習記録がまだありません
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ダッシュボードセクション */}
        <Dashboard />
      </div>
    </Layout>
  )
}
