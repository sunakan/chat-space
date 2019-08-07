# README

# Chat-Space DB設計
## Usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|nickname|string|null: false|
|user_id|string|null: false|
### Association
- has_many :groups, through: :users_groups
- has_many :massages

## Messagesテーブル
|Column|Type|Options|
|------|----|-------|
|image|string|null: false||text|null: false|
|body|text||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|messages_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :users
- has_many :groups, through: :groups_messages

## Groupsテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- has_many :, through: :users_groups
- has_many :messages, through: :groups_messages

## GroupsMessagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|image|string|null: false||text|null: false|
|messages_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :messages
- belongs_to :groups

## UsersGroupsテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|nickname|string|null: false|
|user_id|string|null: false|
|body|text|null: false|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :messages
- belongs_to :users