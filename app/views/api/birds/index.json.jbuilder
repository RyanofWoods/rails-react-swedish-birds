json.birds @birds do |bird|
  observation = bird.observations.first
  json.partial! 'api/shared/bird_with_observation', bird: bird, observation: observation
end
