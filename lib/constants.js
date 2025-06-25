export const COURSE_TYPES = {
  'hour-of-code': {
    label: 'Hour of Code',
    color: 'bg-blue-100 text-blue-800',
    description: '1時間のプログラミング体験'
  },
  'cs-fundamentals': {
    label: 'CS入門',
    color: 'bg-green-100 text-green-800',
    description: 'コンピューターサイエンス入門（20時間コース）'
  },
  'cs-discoveries': {
    label: 'CS Discoveries',
    color: 'bg-purple-100 text-purple-800',
    description: '中高生向けコンピューターサイエンス'
  },
  'cs-principles': {
    label: 'CS Principles',
    color: 'bg-orange-100 text-orange-800',
    description: '高校生向け上級コース'
  },
  'pre-reader': {
    label: 'Pre-reader Express',
    color: 'bg-pink-100 text-pink-800',
    description: '読字前の子ども向けコース'
  }
}

export const LESSONS_BY_COURSE = {
  'hour-of-code': [
    { value: 'minecraft-voyage', label: 'マインクラフト: 海の冒険' },
    { value: 'minecraft-hero-journey', label: 'マインクラフト: ヒーローの旅' },
    { value: 'frozen-loops', label: 'アナと雪の女王: ループを学ぼう' },
    { value: 'star-wars-bb8', label: 'スター・ウォーズ: BB-8と冒険' },
    { value: 'dance-party', label: 'ダンスパーティー' },
    { value: 'sprite-lab', label: 'スプライトラボ' },
    { value: 'flappy-code', label: 'Flappy Code' },
    { value: 'angry-birds', label: 'Angry Birds' }
  ],
  'cs-fundamentals': [
    { value: 'course-a-1', label: 'コースA: レッスン1 - ハッピーマップ' },
    { value: 'course-a-2', label: 'コースA: レッスン2 - 移動パズル' },
    { value: 'course-a-3', label: 'コースA: レッスン3 - パズル入門' },
    { value: 'course-b-1', label: 'コースB: レッスン1 - プログラミングの基礎' },
    { value: 'course-b-2', label: 'コースB: レッスン2 - 迷路' },
    { value: 'course-c-1', label: 'コースC: レッスン1 - ループの威力' },
    { value: 'course-c-2', label: 'コースC: レッスン2 - 蜂の農場' },
    { value: 'course-d-1', label: 'コースD: レッスン1 - 入れ子のループ' },
    { value: 'course-e-1', label: 'コースE: レッスン1 - 関数' }
  ],
  'cs-discoveries': [
    { value: 'unit-1-problem-solving', label: 'ユニット1: 問題解決とコンピューティング' },
    { value: 'unit-2-web-development', label: 'ユニット2: ウェブ開発' },
    { value: 'unit-3-animations', label: 'ユニット3: インタラクティブアニメーション' },
    { value: 'unit-4-design-process', label: 'ユニット4: デザインプロセス' },
    { value: 'unit-5-data-society', label: 'ユニット5: データとAI' }
  ],
  'cs-principles': [
    { value: 'unit-1-digital-info', label: 'ユニット1: デジタル情報' },
    { value: 'unit-2-internet', label: 'ユニット2: インターネット' },
    { value: 'unit-3-programming', label: 'ユニット3: プログラミング' },
    { value: 'unit-4-big-data', label: 'ユニット4: ビッグデータとプライバシー' },
    { value: 'unit-5-building-apps', label: 'ユニット5: アプリ構築' }
  ],
  'pre-reader': [
    { value: 'lesson-1-drag-drop', label: 'レッスン1: ドラッグ&ドロップ' },
    { value: 'lesson-2-sequences', label: 'レッスン2: 順次実行' },
    { value: 'lesson-3-loops-intro', label: 'レッスン3: ループ入門' },
    { value: 'lesson-4-events', label: 'レッスン4: イベント' },
    { value: 'lesson-5-drawing', label: 'レッスン5: お絵描き' }
  ]
}

export const PROGRESS_STATUS = {
  'not-started': {
    label: '未開始',
    color: 'bg-gray-100 text-gray-800',
    icon: '⭕'
  },
  'in-progress': {
    label: '進行中',
    color: 'bg-yellow-100 text-yellow-800',
    icon: '🔄'
  },
  'completed': {
    label: '完了',
    color: 'bg-green-100 text-green-800',
    icon: '✅'
  },
  'reviewed': {
    label: '復習完了',
    color: 'bg-blue-100 text-blue-800',
    icon: '🔍'
  }
}

export const GRADE_OPTIONS = [
  '幼稚園',
  '小学1年生',
  '小学2年生',
  '小学3年生',
  '小学4年生',
  '小学5年生',
  '小学6年生',
  '中学1年生',
  '中学2年生',
  '中学3年生',
  '高校1年生',
  '高校2年生',
  '高校3年生',
  'その他'
]
