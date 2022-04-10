json.birds @birds do |bird|
  json.partial! 'api/beta/shared/bird', bird: bird

  observation = @observations.find_by(bird: bird)
  json.seen observation.present?

  if observation.present?
    json.observation do
      json.partial! 'api/beta/shared/observation', observation: observation
    end
  end
end
