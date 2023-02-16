class Admin::TagsController < Admin::ApplicationController

    def index

        tags = Tag.all

        keywords = tags_param[:keywords] unless tags_param[:keywords].nil?

        tags = tags.where("lower(label) LIKE :search", search: "%#{keywords.downcase}%") unless keywords.nil?

        res(
            data: tags,
            status: :ok,
        )
    end

    def show
        tag = Tag.find_by(slug: params[:slug])
        res(
            data: tag,
            status: :ok
        )
    end

    private

    def tags_param
        params.permit(:keywords)
    end
    
end

