json.extract! bird, :details
json.populationCategory bird.population_category
json.partial! 'api/shared/names', element: bird
json.familyScientificName bird.family.scientific_name
json.orderScientificName bird.family.order.scientific_name
