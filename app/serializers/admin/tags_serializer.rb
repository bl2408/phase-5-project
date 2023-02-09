class Admin::TagsSerializer < ActiveModel::Serializer
  attributes :id, :slug, :label
end
