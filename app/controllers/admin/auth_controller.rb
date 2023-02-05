class Admin::AuthController < Admin::ApplicationController

    skip_before_action :authorize, only: [ :create ]

    def create

        MSG_WRONG_U_P = "Wrong username or password!"

        user = User.find_by(username: params[:username])

        admin = Role.find_by(label: "admin")

        return res_err_ue [MSG_WRONG_U_P] unless user.role == admin

        if user&.authenticate(params[:password])

            session[:user_id] = user.id
            @user = user

            res(
                data: Admin::UserSerializer.new(@user),
                status: :ok
            )

        else
            res_err_ue [MSG_WRONG_U_P]
        end

    end

    def destroy
        session.delete(:user_id)
        head :no_content
    end

end
