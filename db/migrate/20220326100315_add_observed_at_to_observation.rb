class AddObservedAtToObservation < ActiveRecord::Migration[6.1]
  def up
    add_column :observations, :observed_at, :date

    Observation.find_each do |observation|
      observation.update(observed_at: observation.created_at)
    end
  end

  # No down method is implemented because observed_at and created_at times may differ
  # and so we should be careful in deleting (losing) this data of an observation.
end
