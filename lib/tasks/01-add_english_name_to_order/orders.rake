require 'csv'

namespace :orders do
  desc "Update fields"
  task add_english_name: :environment do
    csv_file_path = Rails.root.join('lib', 'tasks', '01-add_english_name_to_order', 'data.csv')
    csv_options = { col_sep: ',', headers: :first_row, header_converters: :symbol }

    order = nil
    counter = 0

    CSV.foreach(csv_file_path, csv_options) do |row|
      order = nil

      order = Order.find_by(scientific_name: row[:order_scientific].capitalize)

      if order
        order.english_name = row[:order_english]

        if order.save
          counter += 1
        else
          puts "something went wrong when saving the order"
        end
      else
        puts "couldnt find the order by scientific name: #{row[:order_scientific].capitalize}"
      end
    end

    puts "#{counter} out of #{Order.count} orders now have an english name"
  end
end
