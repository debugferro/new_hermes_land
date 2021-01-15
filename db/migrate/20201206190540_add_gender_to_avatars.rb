class AddGenderToAvatars < ActiveRecord::Migration[6.0]
  def change
    add_column :avatars, :gender, :integer, default: 1
  end
end

