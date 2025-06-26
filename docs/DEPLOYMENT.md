デプロイガイド
🚀 Vercel デプロイ（推奨）
自動デプロイ

vercel.com にログイン
GitHub リポジトリを連携
「Deploy」ボタンクリック

CLI デプロイ
bash# Vercel CLI インストール
npm i -g vercel

# デプロイ
vercel

# 本番デプロイ
vercel --prod
📱 その他のデプロイ先
Netlify
bashnpm run build && npm run export
# out/ ディレクトリをNetlifyにアップロード
GitHub Pages
bashnpm install --save-dev gh-pages
npm run deploy
🔧 環境変数設定
本システムは環境変数を使用しませんが、将来の拡張に備えて設定方法を記載：
bash# .env.local (開発環境)
NEXT_PUBLIC_APP_NAME=Code.org学習管理システム（開発版）

# .env.production (本番環境)
NEXT_PUBLIC_APP_NAME=Code.org学習管理システム
