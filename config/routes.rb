Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :admin do
    
    post "/login", to: "auth#create"
    post "/logout", to: "auth#destroy"
    get "/valid", to: "auth#render_user"

    resources :posts

    resources :category, param: :slug do
      resources :posts, only: [:index, :show]
    end
    
  end

end
