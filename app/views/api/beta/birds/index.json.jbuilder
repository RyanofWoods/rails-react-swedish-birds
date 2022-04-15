json.birds @birds do |bird|
  observation = @observations.find_by(bird: bird)
  json.partial! 'api/beta/shared/bird_with_observation', bird: bird, observation: observation
end
