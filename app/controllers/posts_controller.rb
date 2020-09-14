class PostsController < ApplicationController
  
  def index
    @posts = Post.all.order(id: "DESC") 
  end

  def create
    post = Post.create(content: params[:content], checked: false)
    render json:{ post: post}
  end

  def checked
    post = Post.find(params[:id])
    if post.checked
      post.update(checked: false) #既読であれば既読を解除するためにfalseへ変更
    else
      post.update(checked: true) #既読でなければ「既読にするためtrueへ変更」
    end

    item = Post.find(params[:id]) #更新したレコードを取得し直す
    render json: { post: item }#JSON形式（データ）としてchecked.jsに返却
  end
 end