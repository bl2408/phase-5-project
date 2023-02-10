class Admin::CollectionSingleSerializer < ActiveModel::Serializer
  has_many :tags, serializer: Admin::TagsSerializer
  attributes :id, :label, :description, :slug, :file_count, :files, :display_type

  def display_type
    "collection"
  end

  def file_count
    object.stored_files.count
  end

  def files
    object.stored_files
  end

end
