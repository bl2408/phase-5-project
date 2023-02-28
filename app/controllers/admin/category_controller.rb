class Admin::CategoryController < Admin::ApplicationController

    def index
        cats = Category.all

        keywords = cat_param[:keywords] unless cat_param[:keywords].nil?

        cats = cats.where("lower(label) LIKE :search", search: "%#{keywords.downcase}%") unless keywords.nil?

        query_total = cats.order("label ASC")

        query_total = query_total.map { |cat| cat.attributes.merge({count: cat.posts.count})} unless params[:count].nil?

        res(
            data: query_total,
            meta:  { target_count: 0 },
            status: :ok
        )
    end

    def show
        cat = Category.find_by(slug: params[:slug])
        res(
            data: cat,
            status: :ok
        )
    end

    def create
        cat = Category.create!(cat_param.except(:keywords, :count, :items, :category))
        res(
            data: cat,
            status: :ok
        )
    end

    def update
        cat = Category.find_by(id: params[:id])
        cat.update!(cat_param.except(:keywords, :count, :items, :category))
        res(
            data: cat,
            status: :ok
        )
    end

    def destroy
        items = !!params[:items] ? params[:items] : params[:id]
        
        Category.find([items])
        .map {|a| a.posts}
        .flatten
        .each {|post| post.update(category: Category.find_or_create_by(label: "uncategorized"))}

        Category.destroy(items)
        render :no_content, status: :ok
    end

    private

    def cat_param
        params.permit(:label, :description, :slug, :keywords, :count, category:{}, items: [], )
    end

end
