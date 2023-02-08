class Admin::PostAllSerializer < ActiveModel::Serializer
  attributes :id, :title, :status, :slug, :publish_datetime
end
