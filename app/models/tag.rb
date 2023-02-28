class Tag < ApplicationRecord

    before_validation :pre_format

    has_many :taggables, dependent: :destroy
    has_many :posts, through: :taggables, source: :target, source_type: "Post"
    has_many :stored_files, through: :taggables, source: :target, source_type: "StoredFile"
    has_many :collections, through: :taggables, source: :target, source_type: "Collection"

    validates :label, 
        presence: true, 
        length: { maximum: 40}, 
        uniqueness: true

    validates :slug, 
        uniqueness: true, 
        format: { 
            with: /[a-z0-9\-]+\S/, message: "Tag slug can only contain letters, numbers and hyphens."
        }

    
    def targets
        taggables.map {|x| x.target}
    end

    private

    def pre_format
        self.label = self.label.downcase
        self.slug = self.label if self.slug.nil?
        self.slug = self.slug.downcase.parameterize(separator: '-')
    end

end
