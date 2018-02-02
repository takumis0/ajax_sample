require 'itunes-search-api'

ITunesSearchAPI.search(
  :term    => "小さな",
  :country => 'jp',
  :media   => 'music',
  :attribute => 'songTerm', #songTerm artistTerm genreIndexはindexだからX
  :lang    => 'ja_jp',
  :limit  => '10'
).each do |item|
  p item
  print("#{item['artistName']},#{item['trackName']},#{item['primaryGenreName']}\n") if item['primaryGenreName'].include?("J-Pop")
end