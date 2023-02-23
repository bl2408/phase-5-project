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

    def update
        file = StoredFile.find_by(id: params[:id])

        file.update!({**stored_files_params, collection: Collection.find_by(id: params[:collection_id])})
        set_tags file
        res(
            data: Admin::StoredFileSingleSerializer.new(file),
            status: :ok
        )
    end

    def destroy
        items = !!params[:items] ? params[:items] : params[:id]
        StoredFile.destroy(items)
        render :no_content, status: :ok
    end

    private 

    def stored_files_params
        params.require(:stored_file).permit(:alt_text)
    end

end


