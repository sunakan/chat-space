json.messages @messages.each do |message|
  json.name     message.user.name
  json.date     message.create_at
  json.image    message.image.url
  json.id       message.id
  json.text     message.content
end