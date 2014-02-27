json.array!(@jobs) do |job|
  json.extract! job, :id, :title, :user_id, :view_counts
  json.url job_url(job, format: :json)
end
