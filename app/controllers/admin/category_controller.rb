class Admin::CategoryController < Admin::ApplicationController

    def index
        res(
            data:Category.all.as_json(only: [:id, :label, :slug]),
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
