class StoredFile < ApplicationRecord
  belongs_to :collection

  has_many :taggables, as: :target, dependent: :destroy
  has_many :tags, :through => :taggables

  has_one_attached :file

end
