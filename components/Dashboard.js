import { useState, useEffect } from 'react'
import { Users, BookOpen, Clock, TrendingUp, Award, Calendar } from 'lucide-react'
import { LocalStorage } from '../lib/storage'
import { getStudentStats, formatDate } from '../lib/utils'
import { COURSE_TYPES, PROGRESS_STATUS } from '../lib/constants'

export default function Dashboard() {
  const [students, setStudents] = useState([])
  const [records, setRecords] = useState([])
  const [stats, setStats] = useState({})

  useEffect(() => {
    const studentsData = LocalStorage.getStudents()
    const recordsData = LocalStorage.getRecords()
    
    setStudents(studentsData)
    setRecords(recordsData)

    // 統計データ計算
    const totalStudents = studentsData.length
    const totalRecords = recordsData.length
    const totalHours = recordsData.reduce((sum, record) => sum + (record.durationMinutes || 0), 0) / 60
    const completedLessons = recordsData.filter(r => r.progressStatus === 'completed').length
    
    // 今月のレッスン数
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const thisMonthLessons = recordsData.filter(record => {
      const lessonDate = new Date(record.lessonDate)
      return lessonDate.getMonth() === currentMonth && lessonDate.getFullYear() === currentYear
    }).length

    // 平均理解度
    const averageUnderstanding = recordsData.length > 0
      ? recordsData.reduce((sum, record) => sum + (record.understandingLevel || 0), 0) / recordsData.length
      : 0

    setStats({
      totalStudents,
      totalRecords,
      totalHours: Math.round(totalHours * 10) / 10,
      completedLessons,
      thisMonthLessons,
      averageUnderstanding: Math.round(averageUnderstanding * 10) / 10
    })
  }, [])

  // 最近の学習記録（最新5件）
  const recentRecords = records
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)

  const StatCard = ({ title, value, icon: Icon, color = 'text-blue-600', bgColor = 'bg-blue-50' }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`flex-shrink-0 ${bgColor} rounded-md p-3`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="text-lg font-medium text-gray-900">{value}</dd>
          </dl>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="総生徒数"
          value={`${stats.totalStudents}名`}
          icon={Users}
          color="text-blue-600"
          bgColor="bg-blue-50"
        />
        <StatCard
          title="総学習記録"
          value={`${stats.totalRecords}件`}
          icon={BookOpen}
          color="text-green-600"
          bgColor="bg-green-50"
        />
        <StatCard
          title="総学習時間"
          value={`${stats.totalHours}時間`}
          icon={Clock}
          color="text-purple-600"
          bgColor="bg-purple-50"
        />
        <StatCard
          title="完了レッスン"
          value={`${stats.completedLessons}件`}
          icon={Award}
          color="text-orange-600"
          bgColor="bg-orange-50"
        />
        <StatCard
          title="今月のレッスン"
          value={`${stats.thisMonthLessons}件`}
          icon={Calendar}
          color="text-pink-600"
          bgColor="bg-pink-50"
        />
        <StatCard
          title="平均理解度"
          value={`${stats.averageUnderstanding}/5`}
          icon={TrendingUp}
          color="text-indigo-600"
          bgColor="bg-indigo-50"
        />
      </div>

      {/* 最近の学習記録 */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">最近の学習記録</h2>
        <div className="space-y-3">
          {recentRecords.length > 0 ? (
            recentRecords.map(record => {
              const student = students.find(s => s.id === record.studentId)
              const courseInfo = COURSE_TYPES[record.courseType]
              const statusInfo = PROGRESS_STATUS[record.progressStatus]
              
              return (
                <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{student?.name || '不明'}</p>
                    <p className="text-sm text-gray-600">{courseInfo?.label || record.courseType}</p>
                    <p className="text-xs text-gray-500">{formatDate(record.lessonDate)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusInfo?.color || 'bg-gray-100 text-gray-800'}`}>
                      {statusInfo?.label || record.progressStatus}
                    </span>
                    <span className="text-lg">{'⭐'.repeat(record.understandingLevel || 0)}</span>
                  </div>
                </div>
              )
            })
          ) : (
            <p className="text-gray-500 text-center py-8">学習記録がまだありません</p>
          )}
        </div>
      </div>
    </div>
  )
}
