class Admin::TagsSerializer < ActiveModel::Serializer
  attributes :id, :slug, :label, :count, :description

  def count
    object.targets.count
  end

end
