class Music < ActiveRecord::Base
    def self.search_by_artist(search, value) #ここでのself.はMusic.を意味する
      where(["#{value} LIKE ?", "%#{search}%"]) #検索とartistの部分一致を表示。Music.は省略。
    end
end