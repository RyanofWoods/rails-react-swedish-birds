json.extract! species, :details
json.populationCategory species.population_category
json.partial! 'api/shared/names', element: species
json.familyScientificName species.family.scientific_name
json.orderScientificName species.family.order.scientific_name
