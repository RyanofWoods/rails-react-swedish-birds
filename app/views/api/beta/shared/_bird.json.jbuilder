json.extract! bird, :details
json.populationCategory bird.population_category
json.partial! 'api/beta/shared/names', element: bird
