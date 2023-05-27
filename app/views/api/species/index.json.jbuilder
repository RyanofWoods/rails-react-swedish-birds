json.species @species do |species|
  json.partial! 'api/shared/species', species: species
end
