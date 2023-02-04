class Admin::AuthController < Admin::ApplicationController

    def create

        user = User.find_by(username: params[:username])

        if user&.authenticate(params[:password])

            session[:user_id] = user.id
            @user = user

            res(
                data: Admin::UserSerializer.new(@user),
                status: :ok
            )

        else
            res_err_ue ["Wrong username or password!"]
        end

    end

    def destroy
        session.delete(:user_id)
        head :no_content
    end

end
