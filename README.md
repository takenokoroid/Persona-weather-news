# Persona-wether-news

## 完成イメージ

![ペルソナの天気予報](https://user-images.githubusercontent.com/52944041/96084382-f67d8980-0ef9-11eb-85a4-8aa9a03c6f04.jpg)

# OpenWeatherAPI

とりあえず API 取得した。

~~認証まで時間かかるみたいなので待機~~
ﾆﾝｼｮｳｼﾀｰ

## document

https://openweathermap.org/api/one-call-api

## GetAPI

`curl "https://api.openweathermap.org/data/2.5/onecall?lat=35.685973&lon=139.756597&units=metric&lang=ja&appid={YOUR API KEY}"`

Location を決めないといけないので東京都千代田区 1-1-1 に仮定する。

- 緯度：35.685973,経度：139.756597
