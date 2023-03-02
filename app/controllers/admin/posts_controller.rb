class Admin::PostsController < Admin::ApplicationController

    def index
        qp = check_queries_params Post

        query = Post.all
        query_total = query.order("#{qp[:order_by]} #{qp[:order]}")

        query_limit_offset = query_total.limit(qp[:limit]).offset(qp[:offset])
        
        total = query_total.count
        count = query_limit_offset.size

        pagination = generate_pagination qp[:offset], total, qp[:limit], qp

        meta = {
            total: total,
            count: count,
            **qp,
            pagination: pagination
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
        post = @user.posts.create!({**post_params.except(:items, :tags, :category), **set_cat})
        set_tags post
        res(
            data: Admin::PostSingleSerializer.new(post),
            status: :ok
        )
    end

    def update
        post = Post.find_by(id: params[:id])
        post.update!({**post_params.except(:items, :tags, :category), **set_cat})
        set_tags post
        res(
            data: Admin::PostSingleSerializer.new(post),
            status: :ok
        )
    end

    def batch_update
        tags_list = params[:tags].map do |tag|
            Tag.find_or_create_by(label: tag)
        end

        Post.where(id: params[:items]).find_each do |coll|
            tags_list.each do |tag|
                Taggable.find_or_create_by(tag: tag, target: coll)
            end
        end
        
        res(
            data: {},
            status: :ok
        )
    end

    def destroy
        items = !!params[:items] ? params[:items] : params[:id]
        Post.destroy(items)
        render :no_content, status: :ok
    end
    

    def status_list
        res(
            data: Post.statuses,
            status: :ok
        )
    end

    private 

    # limit 10
    # total 120
    # offset 10
    # total / limit .ceil = 12 pages
    # offset + limit / limit = 1 current page

    def generate_pagination offset, total, limit, qs_extras

        total_pages = (total / limit.to_f).ceil
        current_page = (offset + limit) / limit
        hash = []

        if total_pages <= 1
            return [
                {
                    query_string: create_qs(limit, 1, qs_extras),
                    label: 1,
                    start: true,
                    current: false
                }
            ]
        end

        steps = 3
        steps_left = current_page - steps
        steps_right = current_page + steps

        point_start = steps_left <= 0 ? 1 : steps_left
        point_end = steps_right >= total_pages ? total_pages : steps_right

        hash << {
            query_string: create_qs(limit, 1, qs_extras),
            label: 1,
            start: true,
            current: false
        } if point_start != 1


        for i in point_start..point_end do
            hash << {
                query_string: create_qs(limit, (limit * i) - limit, qs_extras),
                label: i,
                current: i == current_page,
            }
        end

        hash << {
            query_string: create_qs(limit, (total_pages * limit) - limit, qs_extras),
            label: total_pages,
            end: true,
            current: false
        } if point_end != total_pages

        hash
    end

    def create_qs limit, offset, extras
        {
            **extras,
            limit: limit,
            offset: offset,
        }.to_query
    end

    def post_params
        params.require(:post).permit(:title, :content, :slug, :publish_datetime, :status, :category, items:[], tags:[])
    end

end
