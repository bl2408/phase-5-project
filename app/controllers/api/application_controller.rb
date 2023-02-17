class Api::ApplicationController < ApplicationController
    include ActiveStorage::SetCurrent

    def res data:, status:, meta: nil

        # puts data.size if data.kind_of?(Array)

        obj = {
            data: data
        }
        obj[:meta] = meta unless meta.nil?
        obj[:status] = status

        render json: obj,
        status: status

    end

end
