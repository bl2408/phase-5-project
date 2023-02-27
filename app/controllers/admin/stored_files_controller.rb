class Admin::StoredFilesController <  Admin::ApplicationController

    def index

        files = StoredFile.all
        coll = Collection.find_by(slug: params[:collection_slug])
        return res_err_nf if coll.nil?
        files = files.where(collection: coll) if params[:collection_slug]

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

    def create
        coll = Collection.find_by(slug: params[:collection_slug])

        return res_err_nf if coll.nil?
        file = StoredFile.create(collection: coll)
        set_file file

        res(
            data: Admin::StoredFileSingleSerializer.new(file),
            status: :ok
        )
    end

    def update
        file = StoredFile.find_by(id: params[:id])
        file.update!({
            alt_text: stored_files_params[:alt_text], 
            collection: Collection.find_by(id: params[:collection_id])
        })
        set_tags file
        set_file file      

        res(
            data: Admin::StoredFileSingleSerializer.new(file),
            status: :ok
        )
    end

    def batch_update

        tags_list = params[:tags].map do |tag|
            Tag.find_or_create_by(label: tag)
        end

        StoredFile.where(id: params[:items]).find_each do |file|
            tags_list.each do |tag|
                Taggable.find_or_create_by(tag: tag, target: file)
            end
        end
        
        res(
            data: {}, #Admin::StoredFileSingleSerializer.new(file),
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
        params.permit(:id, :alt_text, :collection_id, file:[], tags:[], items:[])
    end

    def set_file file
        if !!params[:file] && !!params[:file][0]
            file.file.attach(params[:file][0])
        end

    end

end


