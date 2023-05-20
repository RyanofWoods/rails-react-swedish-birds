json.observations do
  @observations.each do |observation|
    json.set! observation.scientific_name do
      json.observedAt observation.observed_at
      json.note observation.note
    end
  end
end
