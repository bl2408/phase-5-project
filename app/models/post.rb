class Post < ApplicationRecord
  before_validation :pre_format

  belongs_to :author, class_name:'User', foreign_key: :author_id
  belongs_to :category

  has_many :taggables, as: :target, dependent: :destroy
  has_many :tags, :through => :taggables


  enum :status, [ :draft, :published, :waiting, :archived, :trashed ]

  validates :title, 
	presence: true

  validates :slug, 
	uniqueness: true, 
	format: { 
		# REGEX only contains lowercase letters, numbers and hyphens
		with: /[a-z0-9\-]+\S/, message: "Post slug can only contain letters, numbers and hyphens."
	}


  private

  def pre_format
    self.title = self.title.downcase
    self.slug = self.slug.downcase.parameterize(separator: '-') unless self.slug.nil?
  end

end
