require 'csv'

# assumes that no models currently exist
# delete them if you do them already and you want to replace them
def csv_to_models
  puts "Creating birds..."

  csv_file_path = Rails.root.join('db', 'data', 'birds.csv')
  csv_options = { col_sep: ',', headers: :first_row, header_converters: :symbol }

  order = nil
  family = nil

  CSV.foreach(csv_file_path, csv_options) do |row|
    unless order&.english_name&.downcase == row[:order_english]&.downcase
      # we have to create the order
      order = Order.create!(english_name: row[:order_english].capitalize,
                            swedish_name: row[:order_swedish].capitalize)
    end

    unless family&.scientific_name == row[:family_scientific]
      # we have to create the order
      family = Family.create!(scientific_name: row[:family_scientific],
                              english_name: row[:family_english],
                              swedish_name: row[:family_swedish],
                              order: order)
    end
    
    Bird.create!(scientific_name: row[:bird_scientific],
                english_name: row[:bird_english],
                swedish_name: row[:bird_swedish].titleize,
                family: family)
  end

  puts "Added to the database:"
  puts "- #{Bird.count} birds"
  puts "- #{Family.count} families"
  puts "- #{Order.count} orders"
end  

csv_to_models