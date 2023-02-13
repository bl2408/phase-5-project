class Admin::StoredFileAllSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  Rails.application.routes.default_url_options[:host] = "localhost:3000"

  attributes :id, :label, :type, :url, :display_type

  def display_type
    "file"
  end

  # Permanent URL only used for admin
  def url
    # rails_representation_url(object.file, only_path: true)
   
    # variant = object.file.variant(resize: "100x100")
    # variant = object.file
    # rails_representation_url(variant, only_path: true)
   
    # object.file.variant(resize: "100x100").processed.url

    # {
    #   url1: rails_blob_url(object.file),
    #   url2: rails_representation_url(object.file.variant(resize: "100x100") )
    #   # url2: object.file.url
    # }
    # rails_representation_url(object.file)
    url_for(object.file)
    
  end

end
