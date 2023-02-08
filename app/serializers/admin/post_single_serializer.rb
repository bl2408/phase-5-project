class Admin::PostSingleSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :status, :slug, :publish_datetime, :category, :tags, :created_at, :updated_at

  def category 
    object.category.as_json(only: [:id, :label, :slug])
  end

  def tags 
    object.tags.as_json(only: [:id, :label, :slug])
  end

end
