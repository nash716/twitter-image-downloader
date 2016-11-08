# Original Images on Twitter

Twitter 上にアップロードされた画像の原寸バージョンをダウンロードしたり新しいタブで開いたりすることが可能な拡張機能です。

[Available in the Chrome Web Store](https://chrome.google.com/webstore/detail/pkkdopcjagbkjdcdpdmnediacjhholli)

## 使い方

Twitter Web Client で表示されている画像を右クリックし、「原寸画像を...」から行いたい操作をクリックしてください。

## 仕様

Twitter Web Client において画像の読み込み先は以下のようになっています。

```
https://pbs.twimg.com/media/<Random>.<Extension>
```

この拡張機能では上記 URL に `:orig` を付加したものに対し、新しいタブで開いたり、ダウンロードを行う機能を提供します。

また、画像が次の URL 上で表示されている場合、ダウンロード時に画像をアップロードしたユーザの Screen Name をファイル名に付加します。

```
https://twitter.com/<Screen Name>/status/<Status ID>
```

加えて、Twitter Web Client 上の画像ビューア UI を変更します。  
複数枚画像がある場合、次の画像・前の画像へ移動する UI がそれぞれ画像の左 50%、右 50% に透明な状態で配置されており、これが画像本体をクリックできない原因となっています。そのため、それぞれの UI のサイズを 20% へ縮小し、中央 60% 部分は直接画像に対して操作できるように Content Script で操作しています。

## 技術的な仕様

- Chrome の contextMenu API を利用しています。
 - Twitter Web Client 上にボタンを追加したりといったことはしません（個人的な好み）。
- `manifest.json` の `permissions` をご覧いただくとわかるように、最小限の権限のみを要求するように配慮しています。

以上がすでに似たような拡張がいくつか存在する中、自分で実装した理由です。

## サポート方針

完全に自分で使うために作ったもののため、積極的な機能追加等は行わない予定です。  
Firefox の WebExtensions, Microsoft Edge のブラウザ拡張としての公開は少しだけ考えています。
