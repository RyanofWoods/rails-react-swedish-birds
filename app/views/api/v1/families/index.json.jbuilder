json.grouped_by @group_by
json.total_groups @total_groups
json.total_birds @total_birds
json.total_seen @total_seen

if @group_by == 'family'
  json.groups @groups do |family|
    json.extract! family, :scientific_name, :english_name, :swedish_name
    json.total_seen current_user.family_birds_seen_count(family)
    json.total_birds family.birds.count
  end
elsif @group_by == 'order'
  json.groups @groups do |order|
    json.extract! order, :scientific_name, :swedish_name
    json.total_seen current_user.order_birds_seen_count(order)
    json.total_birds order.birds.count
  end
end
