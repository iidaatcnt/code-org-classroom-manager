開発ガイド
🛠️ 開発環境セットアップ
必要なソフトウェア

Node.js 18.0.0以上
npm 9.0.0以上
Git 2.30.0以上

開発開始手順

リポジトリクローン
npm install で依存関係インストール
npm run dev で開発サーバー起動
http://localhost:3000 でアクセス

📁 ファイル構成
components/
├── Layout.js           # アプリ全体のレイアウト
├── Dashboard.js        # ダッシュボード統計表示
└── StudentManager.js   # 生徒管理（CRUD）

lib/
├── storage.js          # LocalStorage管理
├── utils.js            # 汎用ユーティリティ関数
└── constants.js        # アプリケーション定数

pages/
├── index.js            # メインページ
└── _app.js             # アプリケーション設定
🔧 コーディング規約
ファイル命名

コンポーネント: PascalCase (StudentManager.js)
ユーティリティ: camelCase (formatters.js)
定数: SCREAMING_SNAKE_CASE (COURSE_TYPES)

コミットメッセージ
feat(student): add student search functionality
fix(storage): resolve data persistence issue
docs(readme): update installation instructions
🧪 テスト
現在は手動テストのみ実装。将来的にJest + React Testing Libraryを導入予定。
手動テスト項目

生徒の追加・編集・削除
学習記録の追加・編集・削除
データのエクスポート・インポート
ブラウザ再読み込み後のデータ保持確認

🚀 新機能追加手順

仕様検討（既存アーキテクチャとの整合性確認）
コンポーネント作成（components/ 内）
ストレージ拡張（lib/storage.js 更新）
手動テスト実行
ドキュメント更新

詳細な開発ガイドラインは、プロジェクトの成長に合わせて拡充していきます。
