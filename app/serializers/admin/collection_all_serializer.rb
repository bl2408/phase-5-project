class Admin::CollectionAllSerializer < ActiveModel::Serializer
  # has_many :tags, serializer: Admin::TagsSerializer
  attributes :id, :label, :slug, :display_type

  def display_type
    "collection"
  end

end
