json.observations @observations do |o|
  json.extract! o, :created_at
  json.bird do
    json.extract! o.bird, :scientific_name, :english_name, :swedish_name
  end
end
