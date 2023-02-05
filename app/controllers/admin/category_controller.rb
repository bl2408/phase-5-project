class Admin::CategoryController < Admin::ApplicationController

    def index
        res(
            data:Category.all,
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

end
