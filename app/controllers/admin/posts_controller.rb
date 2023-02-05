class Admin::PostsController < Admin::ApplicationController

    def index
        res(
            data: Post.all,
            status: :ok
        )
    end

    def show
        post = Post.find_by(id: params[:id])
        res(
            data: post,
            status: :ok
        )
    end

end
