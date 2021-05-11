json.grouped_by @group_by
json.total_groups @total_groups
json.total_birds @total_birds
json.total_seen @total_seen

json.groups @groups do |group|
  json.extract! group, :scientific_name, :english_name, :swedish_name
  json.total_birds group.birds.count

  if @group_by == 'family'
    json.total_seen current_user.family_birds_seen_count(group)
  elsif @group_by == 'order'
    json.total_seen current_user.order_birds_seen_count(group)
  end
end
