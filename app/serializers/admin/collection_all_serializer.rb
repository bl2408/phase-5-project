class Admin::CollectionAllSerializer < ActiveModel::Serializer
  has_many :tags, serializer: Admin::TagsSerializer
  attributes :label, :description, :slug, :file_count, :display_type

  def display_type
    "collection"
  end

  def file_count
    object.stored_files.count
  end

end
