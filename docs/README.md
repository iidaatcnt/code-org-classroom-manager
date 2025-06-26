# Code.org学習管理システム（データベース不要版）

![Code.org Learning Management System](https://img.shields.io/badge/Next.js-15.3.4-black)
![License](https://img.shields.io/badge/license-MIT-blue)
![Status](https://img.shields.io/badge/status-production--ready-green)

Code.orgを教材として使用するプログラミング教室向けの学習進捗管理システムです。データベースを使用せず、ブラウザのローカルストレージで完全に動作します。

## 🌟 特徴

- **🆓 完全無料**: データベース料金・サーバー料金不要
- **📱 レスポンシブ**: PC・タブレット・スマートフォン対応
- **💾 オフライン対応**: インターネット接続不要で動作
- **📊 データエクスポート**: CSV・JSON形式で出力可能
- **🔒 プライバシー重視**: データは端末内にのみ保存
- **⚡ 高速動作**: データベース通信なしで即座にレスポンス
- **🎯 Code.org特化**: Hour of Code、CS入門等の全コース対応

## 🚀 デモ

**ライブデモ**: [https://your-app.vercel.app](https://your-app.vercel.app)

## 📋 機能一覧

### 生徒管理
- [x] 生徒の追加・編集・削除
- [x] 学年・入会日・メモの管理
- [x] 生徒検索・フィルタリング
- [x] 生徒別統計表示

### 学習記録管理
- [x] Code.org全コースに対応
  - Hour of Code（1時間体験）
  - コンピューターサイエンス入門
  - CS Discoveries
  - CS Principles
  - Pre-reader Express
- [x] 学習日時・所要時間の記録
- [x] 進捗状況管理（未開始・進行中・完了・復習完了）
- [x] 理解度評価（5段階）
- [x] 講師メモ・コメント機能
- [x] 学習記録の編集・削除

### 分析・レポート
- [x] ダッシュボード統計
- [x] 生徒別進捗表示
- [x] CSV形式エクスポート（Excel分析用）
- [x] JSON完全バックアップ

## 🛠 技術スタック

- **フロントエンド**: Next.js 15.3.4, React 18, Tailwind CSS
- **アイコン**: Lucide React
- **フォーム管理**: React Hook Form
- **データ保存**: Browser LocalStorage
- **ホスティング**: Vercel（推奨）

## 📦 インストール

### 前提条件
- Node.js 18.0.0以上
- npm または yarn

### 1. リポジトリクローン
```bash
git clone https://github.com/yourusername/code-org-classroom-manager.git
cd code-org-classroom-manager
2. 依存関係インストール
bashnpm install
3. 開発サーバー起動
bashnpm run dev
4. ブラウザでアクセス
http://localhost:3000
📖 使用方法
生徒管理

生徒追加: 「生徒管理」→「追加」→必要情報入力
生徒編集: 生徒名横の編集アイコンクリック
生徒削除: 生徒名横の削除アイコンクリック（確認あり）

学習記録

記録追加: 生徒選択→「記録追加」→レッスン情報入力
進捗確認: ダッシュボードで統計確認
詳細分析: CSV出力してExcelで分析

データ管理

バックアップ: 「バックアップ」ボタン→JSONファイルダウンロード
復元: 「復元」ボタン→JSONファイル選択
CSV出力: 「CSV出力」ボタン→データをExcel等で分析

📁 プロジェクト構造
code-org-classroom-manager/
├── components/          # Reactコンポーネント
├── lib/                # ユーティリティ・ストレージ管理
├── pages/              # Next.js ページ
├── styles/             # スタイル
├── docs/               # ドキュメント
│   ├── ARCHITECTURE.md # アーキテクチャ仕様
│   ├── API_SPECIFICATION.md # API仕様
│   ├── DEPLOYMENT.md   # デプロイガイド
│   └── DEVELOPMENT.md  # 開発ガイド
└── public/             # 静的ファイル
📚 ドキュメント

アーキテクチャ仕様: システム構成・技術仕様
API仕様書: データ構造・関数仕様
デプロイガイド: 本番環境構築手順
開発ガイド: 開発環境・コーディング規約

🤝 コントリビューション

Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

📄 ライセンス
MIT License - 詳細は LICENSE ファイルを参照
👥 作成者

メイン開発者: Your Name
プロジェクト開始: 2024年6月


⭐ このプロジェクトが役に立ったら、GitHubでスターをお願いします！
