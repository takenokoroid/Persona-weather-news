# Persona-wether-news

## 完成イメージ

![ペルソナの天気予報](https://user-images.githubusercontent.com/52944041/96084382-f67d8980-0ef9-11eb-85a4-8aa9a03c6f04.jpg)

# OpenWeatherAPI

とりあえず API 取得した。

~~認証まで時間かかるみたいなので待機~~
ﾆﾝｼｮｳｼﾀｰ

## document

### OneCallAPI

https://openweathermap.org/api/one-call-api

### WeatherConditons

https://openweathermap.org/weather-conditions

## GetAPI

```
curl "url "https://api.openweathermap.org/data/2.5/onecall?lat=35.685973&lon=139.756597&exclude=current,minutely,hourly,alerts&units=metric&lang=ja&appid={YOUR API KEY}"
```

日毎の天気を取得する curl

Location を決めないといけないので東京都千代田区 1-1-1 に仮定する。

- 緯度：35.685973,経度：139.756597

完成イメージの 19 日や 21 日のように 2 分割するのが難しいかもしれない。

### exampleResponse

```{
      "dt": 1602727200,
      "sunrise": 1602708431,
      "sunset": 1602749158,
      "temp": {
        "day": 19.18,
        "min": 16.33,
        "max": 21.26,
        "night": 16.62,
        "eve": 16.33,
        "morn": 19.55
      },
      "feels_like": {
        "day": 16.05,
        "night": 12.58,
        "eve": 12.99,
        "morn": 17.36
      },
      "pressure": 1019,
      "humidity": 66,
      "dew_point": 12.87,
      "wind_speed": 5.66,
      "wind_deg": 55,
      "weather": [
        { "id": 500, "main": "Rain", "description": "小雨", "icon": "10d" }
      ],
      "clouds": 100,
      "pop": 0.49,
      "rain": 2.17,
      "uvi": 5.72
    },
```

#### 使えそうなの

- weather.main:天気
- weather.description:一言
- pop:降水確率
  ~~降水確率を組み合わせれば分割表示行けるかも？~~
  ~~でも晴れの日は雲量を参照。雨の日は降水確率を参照になってスマートじゃない。~~
  ↑WeatherConditons を使えば行けそう
- weather.icon:天気のアイコン
  これがドキュメントでいい感じに紹介されている。
  分割表示も行けそう。

## Fireabse

バックエンドは Firebase にした

現状

- Functions
- Firestore
- Hosting
  を使う予定

### CloudFunctions for firebase

OpenWeatherAPI のデータを取ってくる用。
データベースに格納したほうが OpenWeatherAPI のリクエスト数は抑えれる。
代わりに Firebase のほうを食うことになるけど。
今のところデータベースに格納する予定
