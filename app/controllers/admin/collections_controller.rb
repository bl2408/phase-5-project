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

    def create
        coll = Collection.create!(collection_params)
        set_tags coll
        res(
            data: Admin::CollectionSingleSerializer.new(coll),
            status: :ok
        )
    end

    def update
        coll = Collection.find_by(id: params[:id])
        coll.update!(collection_params)
        set_tags coll
        res(
            data: Admin::CollectionSingleSerializer.new(coll),
            status: :ok
        )
    end

    def destroy
        items = !!params[:items] ? params[:items] : params[:id]
        Collection.destroy(items)
        render :no_content, status: :ok
    end

    private

    def collection_params
        params.require(:collection).permit(:label, :description, :slug)
    end

end
