class Admin::StoredFileSerializer < ActiveModel::Serializer
  has_many :tags, serializer: Admin::TagsSerializer
  attributes :id, :label, :type, :url, :display_type

  def display_type
    "file"
  end
end
