# README

# Chat-Space DB設計
## Usersテーブル
|Column|Type|Options|
|------|----|-------|
|nickname|string|index: true|
### Association
- has_many :groups, through: :users_group
- has_many :massages

## Messagesテーブル
|Column|Type|Options|
|------|----|-------|
|image|string|
|body|text|
|user|integer|null: false, foreign_key: true|
|group|integer|null: false, foreign_key: true|
### Association
- belongs_to :groups
- belongs_to :user

## Groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :users_groups
- has_many :messages

## UsersGroupsテーブル
|Column|Type|Options|
|------|----|-------|
|user|string|null: false, foreign_key: true|
|group|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user