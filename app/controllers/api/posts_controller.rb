class Api::PostsController < Api::ApplicationController

    def index
        posts = Post.all.where(status: "published").order(publish_datetime: :desc)

        res(
            data: posts.as_json(include: [:category ]),
            status: :ok
        )

    end

    def show
        
        post = Post.find_by(slug: params[:slug])

        content = ActiveSupport::JSON.decode(post.content)

        content = content.map do | c |
            value = c["v"]

            if c["t"] == "textcollect"
                value = { text: value["t"], collection: value["c"] }
            end

            {
                type: c["t"],
                name: c["bn"], 
                value: value
            }
        end
        


        content.each do |c|
            if c[:type] == "collection"
                c[:value] = parse_collection c[:value]
            elsif c[:type] == "textcollect"

                puts c[:value][:collection]

                c[:value] = {
                    **c[:value],
                    collection: parse_collection(c[:value][:collection])
                }
            end
        end

        post = post.attributes.merge({
            content: content,
            tags: post.tags,
            category: post.category
        })

        # .find([1,3]).map {|item| pp item.url}``

        res(
            data: post,
            status: :ok
        )
    end


    private

    def parse_collection value
        value.map do | coll_item |
            sf = StoredFile.find_by(id: coll_item["id"])
            {alt_text: sf.alt_text, url: sf.file.url, tags: sf.tags.as_json(only: [:label, :slug])} unless sf.nil?

        end.compact
    end

end
