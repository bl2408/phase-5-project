class User < ApplicationRecord

    belongs_to :role

    has_secure_password

    validates :first_name, 
        presence: true 
    
    validates :last_name, 
        presence: true

    validates :username, 
        presence: true, 
        length: { in: 4..20}, 
        uniqueness: true

    validates :password, 
        length: { minimum: 6 }

    validates :email,
        format: { with: URI::MailTo::EMAIL_REGEXP } 
end
