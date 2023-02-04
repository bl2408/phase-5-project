Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :admin do
    
    post "/login", to: "auth#create"
    post "/logout", to: "auth#destroy"
    
  end

end
