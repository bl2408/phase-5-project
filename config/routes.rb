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


    resources :tags, param: :slug, only: [:show, :index]
    resources :tags

    resources :files, controller: :stored_files, only: [ :create, :show]

    delete "/collections/batch", to: "collections#destroy"
    patch "/collections/batch", to: "collections#batch_update"
    put "/collections/batch", to: "collections#batch_update"
    
    resources :collections, only: [:update, :destroy]

    resources :collections, param: :slug do
      resources :files, controller: :stored_files, only: [ :index, :show]
    end

    delete "/files/batch", to: "stored_files#destroy"
    patch "/files/batch", to: "stored_files#batch_update"
    put "/files/batch", to: "stored_files#batch_update"
    
    resources :files, controller: :stored_files, only: [ :update, :destroy]

    get "/posts/list/status", to: "posts#status_list"


    resources :category, param: :slug do
      resources :posts, only: [:index, :show]
    end
    
  end

  namespace :api do
    resources :posts, only: [:show]
  end

end
