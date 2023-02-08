class Admin::PostAllSerializer < ActiveModel::Serializer
  attributes :id, :title, :status, :slug, :publish_datetime, :category, :tags

  def category 
    object.category.as_json(only: [:id, :label, :slug])
  end

  def tags 
    object.tags.as_json(only: [:id, :label, :slug])
  end

end
