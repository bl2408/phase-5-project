class Admin::StoredFilesController <  Admin::ApplicationController

    def index
        res(
            data: StoredFile.all.map { |file| Admin::StoredFileSerializer.new(file) },
            status: :ok,
        )
    end

    def show
        file = StoredFile.find_by(id: params[:id])
        res(
            data: Admin::StoredFileSerializer.new(file),
            status: :ok,
        )
    end

end


