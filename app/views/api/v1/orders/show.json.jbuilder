json.total_birds @total_birds
json.total_seen @total_seen

json.group_scientific_name @order_scientific_name
json.group_swedish_name @order_swedish_name

json.birds @order_birds do |bird|
  json.extract! bird, :scientific_name, :english_name, :swedish_name
  json.seen current_user.seen_bird?(bird)
end
