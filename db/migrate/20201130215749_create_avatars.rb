class CreateAvatars < ActiveRecord::Migration[6.0]
  def change
    create_table :avatars do |t|
      t.references :user, null: false, foreign_key: true
      t.string :base
      t.string :eyes
      t.string :eyebrows
      t.string :hair
      t.string :mouth
      t.string :nose
      t.string :acessory

      t.timestamps
    end
  end
end
