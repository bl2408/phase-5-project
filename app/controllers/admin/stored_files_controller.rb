class Admin::StoredFilesController <  Admin::ApplicationController

    def index

        files = StoredFile.all
        files = files.where(collection: Collection.find_by(slug: params[:collection_slug])) if params[:collection_slug]

        res(
            data: files.map { |file| Admin::StoredFileSerializer.new(file) },
            status: :ok,
        )
    end

    def show
        
        file = StoredFile.find_by(id: params[:id])
        file = file.where(collection: params[:collection_slug]) if params[:collection_slug]  

        res(
            data: Admin::StoredFileSerializer.new(file),
            status: :ok,
        )
    end

end


