# Work Quest
![workquest](https://user-images.githubusercontent.com/78989717/166938461-6c45efbc-5f00-450f-989a-23a16bbb03dd.png)

学習補助サイトです。

自分の勉強、作業時間に合わせて、アバターが成長していきます。

レスポンシブ対応をしており、各種端末からご覧いただけます。


[紹介動画](https://www.youtube.com/watch?v=pg89nlTQkMY)

# 使用技術

- Node.js: 16.13.2
- React: 16.14.0
- TypeScript: 4.3.3
- webpack: 4.46.0
- Nginx: latest
- Express: 4.17.1
- Mysql: 8.0.27
- Docker/Docker Compose
- Jest: 27.4.7
- React Testing Library: 11.1.0
- Mock Service Worker: 0.35.0
- Supertest: 6.1.6
- CircleCI
- AWS
  - VPC
  - EC2
  - ECR
  - ECS
  - ELB
  - Route53
  - Certificate Manager
  - RDS
  - S3

# ER 図

![ER図](https://user-images.githubusercontent.com/78989717/166605065-d1e0153c-aa35-4ab0-b058-67ac34c11ace.png)

# AWS 構成図

![AWS構成図](https://user-images.githubusercontent.com/78989717/166644053-c0a36d65-5355-4ef5-a412-8d0550b21b98.png)

# CI/CD

![CI/CD](https://user-images.githubusercontent.com/78989717/166641284-b62e1195-2ab7-4010-b45c-f4419c527d31.png)

- git へ push 時、CircleCI において Docker で環境構築を行い、Jest によるテストを行います。

# 機能一覧

- ユーザー登録、ログイン機能(JSON Web Token)
- 各種 CRUD 機能(Formik)
  - 画像投稿機能(AWS SDK)
- ワーク機能
  - タイマー機能(Moment.js)
  - カレンダー機能(react-dates)
- ランキング機能
  - 無限スクロール機能(React Infinite Scroller)
- ギルド機能
  - チャット機能
- レポート機能
  - グラフ表示(Chart.js)
  - 週間進捗表示(cron)
- 応援機能
- スタイリング全般(Chakra UI)
- 各イラスト(EDGE(ドット絵エディタ))
