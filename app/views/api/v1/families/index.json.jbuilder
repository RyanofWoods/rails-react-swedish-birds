json.total_families @total_families
json.total_birds @total_birds
json.total_seen @total_seen

json.families @families do |family|
  json.extract! family, :scientific_name, :english_name, :swedish_name
  json.total_seen current_user.family_birds_seen_count(family)
  json.total_birds family.birds.count
end
