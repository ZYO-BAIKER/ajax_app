Rails.application.routes.draw do
  root to: 'posts#index' #編集
  post 'posts', to: 'posts#create'
  get 'posts/:id', to: 'posts#checked' #メモのidを取得
end