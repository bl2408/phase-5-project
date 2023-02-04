class Admin::ApplicationController < ApplicationController


    def res_err_ue msg
        res_err msg: msg, status: :unprocessable_entity
    end 


    def res_err msg:, status:
        render json: {
            errors: msg
        }, 
        status: status
    end

    
    def res data:, status:, meta: nil

        obj = {
            data: data
        }
        obj[:meta] = meta unless meta.nil?
        obj[:status] = status

        render json: obj,
        status: status

    end


end
