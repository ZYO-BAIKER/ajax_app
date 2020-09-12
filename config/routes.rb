Rails.application.routes.draw do
  root to: 'posts#index' #編集
  post 'posts', to: 'post#create'
end