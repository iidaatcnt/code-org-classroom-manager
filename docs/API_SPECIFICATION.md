# API仕様書

## 📊 データ構造仕様

### 生徒データ (Student)
```javascript
{
  id: string,                // 一意識別子
  name: string,              // 生徒名
  grade: string,             // 学年
  joinDate: string,          // 入会日（ISO 8601形式）
  notes?: string,            // メモ
  createdAt: string,         // 作成日時
  updatedAt: string          // 更新日時
}
学習記録データ (LearningRecord)
javascript{
  id: string,                // 一意識別子
  studentId: string,         // 関連する生徒のID
  courseType: string,        // コース種別
  lessonName: string,        // レッスン名
  lessonDate: string,        // 実施日
  startTime: string,         // 開始時間
  durationMinutes: number,   // 所要時間（分）
  progressStatus: string,    // 進捗状況
  understandingLevel: number,// 理解度（1-5）
  notes?: string,            // 講師メモ
  createdAt: string,         // 作成日時
  updatedAt: string          // 更新日時
}
🔧 LocalStorage API
主要な関数：

LocalStorage.getStudents(): 全生徒データ取得
LocalStorage.addStudent(data): 生徒追加
LocalStorage.updateStudent(id, updates): 生徒更新
LocalStorage.deleteStudent(id): 生徒削除
LocalStorage.getRecords(studentId?): 学習記録取得
LocalStorage.addRecord(data): 学習記録追加

詳細な実装については lib/storage.js を参照してください。
