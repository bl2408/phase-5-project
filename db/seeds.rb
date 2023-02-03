# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


# Roles
role_admin = Role.create!(label: "admin", description: "Administrator role, access to everything.")
Role.create(label: "user", description: "General role, read access only.")

# User
User.create!(
    first_name: "Brian", 
    last_name: "Lambert", 
    username: "brian", 
    email: "brian@email.com",
    password: "password123",
    role: role_admin
)
