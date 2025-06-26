# アーキテクチャ仕様書

## 🏗️ システム構成

Code.org学習管理システムは、クライアントサイドのみで動作するSPA（Single Page Application）です。
データベースを使用せず、ブラウザのLocalStorageにデータを保存することで、完全無料での運用を実現しています。

## 📂 技術スタック

- **フロントエンド**: Next.js 15.3.4, React 18
- **スタイル**: Tailwind CSS
- **アイコン**: Lucide React
- **フォーム**: React Hook Form
- **日付処理**: date-fns
- **通知**: React Hot Toast
- **データ保存**: Browser LocalStorage

## 📊 データフロー
User Action → Component → Storage.js → LocalStorage
↓
State Update ← Component ← Storage.js ← LocalStorage

詳細なアーキテクチャ仕様については、開発時に随時更新してください。
