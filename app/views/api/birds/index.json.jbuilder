json.birds @birds do |bird|
  json.partial! 'api/shared/bird', bird: bird
end
