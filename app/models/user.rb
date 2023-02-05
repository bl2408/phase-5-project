class User < ApplicationRecord

    before_validation :pre_format

    belongs_to :role
    has_many :posts, class_name:'Post', foreign_key: :author_id


    has_secure_password

    validates :first_name, 
        presence: true 
    
    validates :last_name, 
        presence: true

    validates :username, 
        presence: true, 
        length: { in: 4..20}, 
        uniqueness: true,
        format: { 
            with: /[a-z0-9\-\_]+\S/, message: "Username can only contain letters, numbers, hyphens and underscores."
        }

    validates :password, 
        length: { minimum: 6 }

    validates :email,
        format: { with: URI::MailTo::EMAIL_REGEXP } 


    private

    def pre_format
        # lowercase fields
        self.first_name = self.first_name.downcase
        self.last_name = self.last_name.downcase
        self.username = self.username.downcase    
    end
end
