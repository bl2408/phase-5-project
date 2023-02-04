class StoredFile < ApplicationRecord
  before_destroy :purge_file
  
  belongs_to :collection

  has_many :taggables, as: :target, dependent: :destroy
  has_many :tags, :through => :taggables

  has_one_attached :file

  def url
    file.url
  end

  private

  def purge_file
    file.purge
  end
end