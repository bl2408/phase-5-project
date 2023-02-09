class Admin::PostAllSerializer < ActiveModel::Serializer
  has_many :tags, serializer: Admin::TagsSerializer
  attributes :id, :title, :status, :slug, :publish_datetime, :category

  def category 
    object.category.as_json(only: [:id, :label, :slug])
  end

end
