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
        post = @user.posts.create!({**post_params, **set_cat})
        set_tags post
        res(
            data: Admin::PostSingleSerializer.new(post),
            status: :ok
        )
    end

    def update
        post = Post.find_by(id: params[:id])
        post.update!({**post_params, **set_cat})
        set_tags post
        res(
            data: Admin::PostSingleSerializer.new(post),
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

end
