class Category < ApplicationRecord
    before_validation :pre_format

    has_many :posts

    validates :label, 
        presence: true, 
        length: { maximum: 40}, 
        uniqueness: true

    validates :slug, 
        uniqueness: true, 
        format: { 
            with: /[a-z0-9\-]+\S/, message: "Category slug can only contain letters, numbers and hyphens."
        }

    private

    def pre_format
        self.label = self.label.downcase
        
        self.slug = self.label if self.slug.nil?
        self.slug = self.slug.downcase.parameterize(separator: '-')
    end

end
