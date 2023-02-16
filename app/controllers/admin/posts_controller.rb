class Admin::PostsController < Admin::ApplicationController

    def index
        qp = check_queries_params Post

        query = Post.all
        query_total = query.order("#{qp[:order_by]} #{qp[:order]}")

        query_limit_offset = query_total.limit(qp[:limit]).offset(qp[:offset])

        meta = {
            total: query_total.count,
            count: query_limit_offset.size,
            **qp,
        }
        
        res(
            data: query_limit_offset.map { |post|  Admin::PostAllSerializer.new(post) },
            meta: meta,
            status: :ok
        )
    end

    def show
        post = Post.find_by(id: params[:id])
        res(
            data: Admin::PostSingleSerializer.new(post),
            status: :ok
        )
    end

    def create
        @post = @user.posts.create!({**post_params, **set_cat})
        set_tags
        res(
            data: Admin::PostSingleSerializer.new(@post),
            status: :ok
        )
    end

    def update
        @post = Post.find_by(id: params[:id])
        @post.update!({**post_params, **set_cat})
        set_tags
        res(
            data: Admin::PostSingleSerializer.new(@post),
            status: :ok
        )
    end
    

    def status_list
        res(
            data: Post.statuses,
            status: :ok
        )
    end

    private 

    def post_params
        params.require(:post).permit(:title, :content, :slug, :publish_datetime, :status, :category)
    end

    def set_tags
        if params[:tags]
            # find and add tags
            params[:tags].map do |tag|
                tag = Tag.find_or_create_by(label: tag)
                Taggable.find_or_create_by(tag: tag, target: @post)
            end

            # remove tags
            @post.tags.map do |post_tag|
                @post.tags.find_by(label: post_tag).destroy unless params[:tags].include? post_tag.label
            end
        else
            @post.tags.destroy_all
        end
    end

    def set_cat
        if !params[:category]
            raise "Category param not found!"
        end
        
        { 
            category: Category.find_or_create_by(label: params[:category])
        }
    end

end
