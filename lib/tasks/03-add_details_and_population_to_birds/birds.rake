require 'csv'

namespace :birds do
  desc "Add details and population category"
  task add_details_and_population: :environment do
    csv_file_path = Rails.root.join('lib', 'tasks', '03-add_details_and_population_to_birds', 'data.csv')
    csv_options = { col_sep: ',', headers: :first_row, header_converters: :symbol }

    bird = nil
    counter = 0

    CSV.foreach(csv_file_path, csv_options) do |row|
      bird = nil

      bird = Bird.find_by(scientific_name: row[:bird_scientific].capitalize)

      if bird
        bird.details = row[:bird_details]

        bird.population_category = row[:bird_population] unless row[:bird_population] == "nil"

        if bird.save
          counter += 1
        else
          puts "Something went wrong when saving the bird"
        end

      else
        puts "Couldnt find the bird by scientific name: #{row[:bird_scientific].capitalize}"
      end
    end

    puts "#{counter} out of #{Bird.count} birds now details and a population category"
  end
end
