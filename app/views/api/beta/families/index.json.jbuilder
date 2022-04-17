json.families @families do |family|
  json.partial! 'api/beta/shared/names', element: family
  json.orderScientificName family.order.scientific_name
end
