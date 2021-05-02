json.total_families @total_families
json.total_birds @total_birds
json.total_seen @total_seen

json.families @families do |family|
  json.extract! family, :scientific_name, :english_name, :swedish_name
end
