class Admin::CategoryController < Admin::ApplicationController

    def index

        cats = Category.all

        keywords = cat_param[:keywords] unless cat_param[:keywords].nil?

        cats = cats.where("lower(label) LIKE :search", search: "%#{keywords.downcase}%") unless keywords.nil?

        res(
            data: cats.as_json(only: [:id, :label, :slug]),
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

    private

    def cat_param
        params.permit(:keywords)
    end

end
