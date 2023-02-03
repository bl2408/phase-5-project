class Post < ApplicationRecord
  before_validation :pre_format

  belongs_to :author, class_name:'User', foreign_key: :author_id

  enum :status, [ :draft, :published, :waiting, :archived, :trashed ]

  validates :title, 
	presence: true

  validates :slug, 
	uniqueness: true, 
	format: { 
		# REGEX only contains lowercase letters, numbers and hyphens
		with: /[a-z0-9\-]+\S/, message: "Slug can only contain letters, numbers and hyphens."
	}


  private

  def pre_format
    self.title = self.title.downcase
    self.slug = self.slug.downcase
    self.slug = self.slug.parameterize(separator: '-')
  end

end
