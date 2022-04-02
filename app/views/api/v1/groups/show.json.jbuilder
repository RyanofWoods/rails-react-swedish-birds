json.total_birds @total_birds
json.total_seen @total_seen

json.group_scientific_name @group_scientific_name
json.group_english_name @group_english_name
json.group_swedish_name @group_swedish_name

json.birds @birds do |bird|
  json.extract! bird, :scientific_name, :english_name, :swedish_name, :details

  observation = @observations.find_by(bird: bird)
  json.seen observation.present?

  if observation.present?
    json.observation do
      json.extract! observation, :observed_at, :note
    end
  end
end
