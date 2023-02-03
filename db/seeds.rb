# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "SEEDING"

# Roles
role_admin = Role.create!(label: "admin", description: "Administrator role, access to everything.")
Role.create(label: "user", description: "General role, read access only.")

# Users
user1 = User.create!(
    first_name: "Brian", 
    last_name: "Lambert", 
    username: "Brian", 
    email: "brian@email.com",
    password: "password123",
    role: role_admin
)

# Categories
cat1 = Category.create(label: "TEST", slug: "test", description: "description for test category")
cat2 = Category.create(label: "TEST with spaces", slug: "TEST With SpAcEs", description: "description for test with spaces category")


# Posts
Post.create(
    title: "Sample post",
    slug: "SaMple posT",
    content: "sample text here",
    publish_datetime: DateTime.now,
    author: user1,
    status: 1,
    category: cat1
)



puts "SEEDING COMPLETE!"