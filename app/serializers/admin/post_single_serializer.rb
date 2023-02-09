class Admin::PostSingleSerializer < ActiveModel::Serializer
  has_many :tags, serializer: Admin::TagsSerializer
  attributes :id, :title, :content, :status, :slug, :publish_datetime, :category, :created_at, :updated_at

  def category 
    object.category.as_json(only: [:id, :label, :slug])
  end

end
