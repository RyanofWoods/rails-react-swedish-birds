json.partial! 'api/shared/bird', bird: bird

json.seen observation.present?

if observation.present?
  json.observation do
    json.partial! 'api/shared/observation', observation: observation
  end
end
