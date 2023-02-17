class Api::PostsController < Api::ApplicationController

    def show
        
        post = Post.find_by(id: params[:id])

        content = ActiveSupport::JSON.decode(post.content)


        content = content.map { |c| {type: c["t"], name: c["bn"], value: c["v"]} }

        content.each do |c|
            if c[:type] == "collection"
                c[:value] = c[:value].map do | coll_item |
                    sf = StoredFile.find_by(id: coll_item["id"])
                    {alt_text: sf.alt_text, url: sf.file.url, tags: sf.tags.as_json(only: [:label, :slug])}
                end
            end
        end

        post = post.attributes.merge({content: content})

        # .find([1,3]).map {|item| pp item.url}``

        res(
            data: post,
            status: :ok
        )


    end

end
