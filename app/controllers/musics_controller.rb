class MusicsController < ApplicationController
    
    def index
        @musics = Music.all
    end
    
    def new
       @musics = Music.new
       respond_to do |format|
          format.html
          format.js
        end
    end
    
    def create
       @musics = Music.all
       @music = Music.new(music_params)
       respond_to do |format|
           if @music.save
               format.html
               format.js
           else
               format.js {render :new}
           end
       end
    end
    
    def search
        @musics = Music.search_by_artist(params[:q],params[:v])
    end
    
    def destroy
        Music.find(params[:id]).destroy
        flash[:success] = "User deleted"
        redirect_to musics_url
    end
    
    def music_params
        params.require(:music).permit(:title,:artist,:genre)
    end
end
