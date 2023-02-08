class Admin::ApplicationController < ApplicationController

    before_action :authorize

    def res_err_ue msg
        res_err msg: msg, status: :unprocessable_entity
    end 

    def res_err_ua
        res_err msg: ["Access denied"], status: :unauthorized
    end 

    def res_err msg:, status:
        render json: {
            errors: msg,
            status: status
        }, 
        status: status
    end

    
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

    private

    def authorize
        @user = User.find_by(id: session[:user_id])
        return res_err_ua unless @user
    end

    def check_queries_params forClass

        params[:offset] ||= 0
        params[:limit] ||= 10
        params[:order] ||= ""
        params[:order_by] ||= ""

        order = 'DESC' # default
        params[:order] = params[:order].upcase if params[:order].to_s #if string then upcase
        order = params[:order] if params[:order] == "ASC" || params[:order] == "DESC" # set option only if asc or desc

        offset = params[:offset].to_i

        limit = params[:limit].to_i
        limit = 1 if limit <= 0
        limit = 100 if limit > 100

        order_by = "id" # default
        order_by = params[:order_by] if forClass.column_names.include? params[:order_by]
        
        return {order: order, order_by: order_by, limit: limit, offset: offset}
    end
end
