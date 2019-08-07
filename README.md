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
|text|
|body|
|user|integer|null: false, foreign_key: true|
|group|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :group

## Groupsテーブル
|name|Type|Options|
|------|----|-------|
|body|text|null: false|
### Association
- has_many :users, through: :users_groups
- has_many :messages

## UsersGroupsテーブル
|Column|Type|Options|
|------|----|-------|
|user|string|null: false, foreign_key: true|
|group|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user