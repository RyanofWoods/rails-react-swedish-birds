require 'csv'

namespace :families do
  desc "Update fields"
  task update_english_name: :environment do
    csv_file_path = Rails.root.join('lib', 'tasks', '02-update_family_english_name', 'data.csv')
    csv_options = { col_sep: ',', headers: :first_row, header_converters: :symbol }

    family = nil
    counter = 0

    CSV.foreach(csv_file_path, csv_options) do |row|
      family = nil

      family = Family.find_by(scientific_name: row[:family_scientific])

      if family
        family.english_name = row[:family_new_english]

        if family.save
          counter += 1
        else
          puts "Something went wrong when updating the family"
        end
      else
        puts "Couldn't find the family by scientific name: #{row[:family_scientific].capitalize}"
      end
    end

    puts "#{counter} out of 18 families' english_name were updated"
  end
end
