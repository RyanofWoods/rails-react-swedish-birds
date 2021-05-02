json.total_birds @total_birds
json.total_seen @total_seen

json.birds @family_birds do |bird|
  json.extract! bird, :scientific_name, :english_name, :swedish_name
  json.seen current_user.seen_bird?(bird)
end
