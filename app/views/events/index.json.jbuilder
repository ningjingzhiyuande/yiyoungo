json.array!(@events) do |event|
  json.extract! event, :id, :title, :user_id, :view_counts
  json.url event_url(event, format: :json)
end
