class Admin::StoredFilesController <  Admin::ApplicationController

    def index

        files = StoredFile.all
        files = files.where(collection: Collection.find_by(slug: params[:collection_slug])) if params[:collection_slug]

        res(
            data: files.map { |file| Admin::StoredFileAllSerializer.new(file) },
            status: :ok,
        )
    end

    def show
        
        file = StoredFile.where(id: params[:id])
        file = file.where(collection: Collection.find_by(slug: params[:collection_slug])) if params[:collection_slug]
        file = file.first

        res(
            data: file.nil? ? nil : Admin::StoredFileSingleSerializer.new(file),
            status: :ok,
        )
    end

    def destroy
        items = !!params[:items] ? params[:items] : params[:id]
        StoredFile.destroy(items)
        render :no_content, status: :ok
    end

end


