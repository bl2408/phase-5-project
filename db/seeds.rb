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
role_user = Role.create(label: "user", description: "General role, read access only.")

# Users
user1 = User.create!(
    first_name: "Brian", 
    last_name: "Lambert", 
    username: "Brian", 
    email: "brian@email.com",
    password: "password123",
    role: role_admin
)

User.create!(
    first_name: "Rob", 
    last_name: "Lambert", 
    username: "Robert", 
    email: "rob@email.com",
    password: "password123",
    role: role_user
)

# Categories
cat0 = Category.create(label: "uncategorized", slug: "uncategorized", description: "Posts without a category.")
cat1 = Category.create(label: "TEST", slug: "test", description: "description for test category")
cat2 = Category.create(label: "TEST with spaces", slug: "TEST With SpAcEs", description: "description for test with spaces category")

arr_cat = [cat0, cat1, cat2]


# Tags
tag1 = Tag.create(label: "test tag", slug:"test-tag", description: "Description for test tag 1")
tag2 = Tag.create(label: "test tag 2", slug:"test-tag-2", description: "Description for test tag 2")

arr_tag = [tag1, tag2]

# Posts
Post.create(
    title: "Sample post",
    slug: "SaMple posT",
    content: "sample text here",
    publish_datetime: DateTime.now,
    author: user1,
    status: 1,
    category: cat1,
    tags: [tag1, tag2]
)

144.times do |i|
    title = Faker::Book.title
    
    Post.create(
        title: title,
        slug: title,
        content: "[{\"t\":\"text\",\"bn\":\"basic\",\"v\":\"basic text\"}]",
        publish_datetime: DateTime.now,
        author: user1,
        status: rand(1),
        category: arr_cat[rand(arr_cat.size)],
        tags: [arr_tag[rand(arr_tag.size)]]
    )
end

# Collection
collection1 = Collection.create(
    label: "General", 
    slug: "general", 
    description:"Generic collection for files.",
    tags: [tag2, tag1],
)
tag3 = Tag.create(label: "180sx", slug:"180sx", description: "180sx car")
collection2 = Collection.create(
    label: "Cars", 
    slug: "cars", 
    description:"Car photos",
    tags: [tag3],
)

# Stored File
file1 = StoredFile.create(
    alt_text: "Test image", 
    tags: [tag2, tag1],
    collection: collection1
)

file1.file.attach(io: File.open('storage/seed_files/1.jpg'), filename: '1.jpg')

file2 = StoredFile.create(
    alt_text: "180sx", 
    tags: [tag3],
    collection: collection2
)

file2.file.attach(io: File.open('storage/seed_files/car1.JPG'), filename: 'car1.JPG')


file3 = StoredFile.create(
    alt_text: "180sx", 
    tags: [tag3],
    collection: collection2
)

file3.file.attach(io: File.open('storage/seed_files/car2.jpg'), filename: 'car2.jpg')


puts "SEEDING COMPLETE!"