class Tag < ApplicationRecord

    before_validation :pre_format

    has_many :taggables
    has_many :posts, through: :taggables, source: :target, source_type: "Post"

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
        self.slug = self.slug.downcase.parameterize(separator: '-') unless self.slug.nil?
    end

end
