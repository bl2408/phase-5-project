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

    def batch_update

        tags_list = params[:tags].map do |tag|
            Tag.find_or_create_by(label: tag)
        end

        Collection.where(id: params[:items]).find_each do |coll|
            tags_list.each do |tag|
                Taggable.find_or_create_by(tag: tag, target: coll)
            end
        end
        
        res(
            data: {}, #Admin::StoredFileSingleSerializer.new(file),
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
        params.permit(:label, :description, :slug, tags:[], items:[])
    end

end
