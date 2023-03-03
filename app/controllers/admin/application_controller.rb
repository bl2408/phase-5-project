class Admin::ApplicationController < ApplicationController

    before_action :authorize


    def summaries
        posts = Post.all
        posts_hash = {
            count: posts.count,
            draft_count: posts.where(status: 0).count, 
            published_count: posts.where(status: 1).count, 
            recent: posts.last(5).map { | post |  Admin::PostAllSerializer.new(post) }
            
        }
        collection = Collection.all
        coll_hash = {
            count: collection.count,
            recent: collection.limit(5).order(id: :desc).map { |coll|  Admin::CollectionSingleSerializer.new(coll) }
        }
        files = StoredFile.all
        sf_hash = {
            count: files.count,
            recent: files.limit(5).order(id: :desc).map { |file| Admin::StoredFileSingleSerializer.new(file)}
        }

        tags = Tag.all
        tags_hash = {
            count: tags.count,
            recent: tags.limit(5).order(id: :desc).map { | tag | Admin::TagsSerializer.new(tag).attributes.merge({count: tag.targets_count})}
        }

        cats = Category.all
        cat_hash = {
            count: cats.count,
            recent: cats.limit(5).order(id: :desc).map { | cat |cat.attributes.merge({count: cat.posts_count})}
        }

        res(
            data: {
                posts: posts_hash,
                collections: coll_hash,
                files: sf_hash,
                tags: tags_hash,
                categories: cat_hash
            },
            status: :ok
        )
    end


    def res_err_ue msg
        res_err msg: msg, status: :unprocessable_entity
    end 
    def res_err_nf 
        res_err msg: ["Not found!"], status: :not_found
    end 

    def res_err_ua
        res_err msg: ["Access denied"], status: :unauthorized
    end 

    def res_err msg:, status:
        render json: {
            errors: msg,
            status: status
        }, 
        status: status
    end

    
    def res data:, status:, meta: nil
        obj = {
            data: data
        }
        obj[:meta] = meta unless meta.nil?
        obj[:status] = status

        render json: obj,
        status: status

    end

    private

    def authorize
        @user = User.find_by(id: session[:user_id])
        return res_err_ua unless @user
    end

    def check_queries_params forClass

        params[:offset] ||= 0
        params[:limit] ||= 10
        params[:order] ||= ""
        params[:order_by] ||= ""

        order = 'DESC' # default
        params[:order] = params[:order].upcase if params[:order].to_s #if string then upcase
        order = params[:order] if params[:order] == "ASC" || params[:order] == "DESC" # set option only if asc or desc

        offset = params[:offset].to_i

        limit = params[:limit].to_i
        limit = 1 if limit <= 0
        limit = 100 if limit > 100

        order_by = "id" # default
        order_by = params[:order_by] if forClass.column_names.include? params[:order_by]
        
        return {order: order, order_by: order_by, limit: limit, offset: offset}
    end


    def set_tags target
        if params[:tags]
            # find and add tags
            params[:tags].map do |tag|
                tag = Tag.find_or_create_by(label: tag)
                Taggable.find_or_create_by(tag: tag, target: target)
            end

            # remove tags
            target.tags.map do |target_tag|
                target.taggables.find_by(tag: target_tag).destroy unless params[:tags].include? target_tag.label
            end
        else
            target.taggables.destroy_all
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
