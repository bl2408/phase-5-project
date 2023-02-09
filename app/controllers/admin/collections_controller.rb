class Admin::CollectionsController < Admin::ApplicationController

    def index
        res(
            data: Collection.all.map { |collection| Admin::CollectionAllSerializer.new(collection)},
            status: :ok,
        )
    end

    def show
        collect = Collection.find_by(slug: params[:slug])
        res(
            data: Admin::CollectionSingleSerializer.new(collect),
            status: :ok,
        )
    end

end
