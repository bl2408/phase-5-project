class Admin::StoredFileSingleSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  Rails.application.routes.default_url_options[:host] = "localhost:3000"

  has_many :tags, serializer: Admin::TagsSerializer
  belongs_to :collection, serializer: Admin::CollectionAllSerializer
  attributes :id, :label, :type, :url, :display_type

  def display_type
    "file"
  end

  def url
    url_for(object.file)
  end

end
