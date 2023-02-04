class Admin::ApplicationController < ApplicationController

    before_action :authorize

    def res_err_ue msg
        res_err msg: msg, status: :unprocessable_entity
    end 

    def res_err_ua
        res_err msg: ["Unauthorized"], status: :unauthorized
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

    private

    def authorize
        @user = User.find_by(id: session[:user_id])
        return res_err_ua unless @user
    end


end
