Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :admin do
    
    post "/login", to: "auth#create"
    post "/logout", to: "auth#destroy"
    get "/valid", to: "auth#render_user"

    resources :posts
    delete "/posts/batch", to: "posts#destroy"


    resources :tags, param: :slug

    resources :files, controller: :stored_files, only: [ :create, :show]

    resources :collections, only: [:update, :destroy]
    delete "/collections/batch", to: "collections#destroy"

    resources :collections, param: :slug do
      resources :files, controller: :stored_files, only: [ :index, :show]
    end

    resources :files, controller: :stored_files, only: [ :update, :destroy]
    delete "/files/batch", to: "stored_files#destroy"

    get "/posts/list/status", to: "posts#status_list"


    resources :category, param: :slug do
      resources :posts, only: [:index, :show]
    end
    
  end

  namespace :api do
    resources :posts, only: [:show]
  end

end
