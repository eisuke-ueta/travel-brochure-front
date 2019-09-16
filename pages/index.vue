<template lang="pug">
div

  //- Hero
  section.white.py-5
    v-layout.my-3(column wrap align-center)
      v-flex(xs12)
        v-container(grid-list-xl)
          v-layout(row wrap align-center)
            v-flex.text-xs-center.hidden-md-and-up(xs12 sm8 offset-sm2 md5 offset-md1)
              h1.mb-3.display-1 旅をもっと楽しむ
              div.subheading.mb-3 タビシヨは、旅のしおりを投稿して、皆さんの考える旅のプランをユーザーに共有することができる、まったく新しいタイプのウェブサービスです。
              v-layout(row wrap justify-center)
                v-btn.primary(flat round to='/signup') ユーザー登録へ
                v-btn(flat outline round to='/login') ログイン
            v-flex.text-xs-center.hidden-md-and-up.mt-5(xs12 md6)
              img(src="/icons/carry-on-colour.svg" height="300")

            v-flex.hidden-sm-and-down(xs12 md5 offset-md1)
              h1.mb-4.display-2 旅をもっと楽しむ
              div.subheading.mb-4 「タビシヨ」は、旅のしおりを投稿して、皆さんの考える旅のプランをユーザーに共有することができる、まったく新しいタイプのウェブサービスです。
              v-layout(row wrap)
                v-btn.primary(flat round to='/signup') ユーザー登録へ
                v-btn(flat outline round to='/login') ログイン
            v-flex.text-xs-center.hidden-sm-and-down.mt-5(xs12 md6)
              img(src="/icons/carry-on-colour.svg" height="350")

  //- サービス
  section.py-5
    v-layout(column wrap align-center)
      v-flex.pa-4(xs12 sm4)
        div(class="text-xs-center")
          h2.mb-2.headline 旅は行く前から始まっている
          div タビシヨでまったく新しい旅の楽しみ方を体験しましょう。
      v-flex(xs12)
        v-container(grid-list-xl)
          v-layout(row wrap align-center)
            v-flex(xs12 md4)
              v-card.py-3(class="elevation-0 transparent")
                v-card-text(class="text-xs-center")
                  img(src="/icons/drawkit-notebook-man-colour.svg" height="200")
                v-card-title(primary-title class="layout justify-center")
                  div(class="headline text-xs-center") 旅のしおりを作る
                v-card-text
                  | 旅のテーマを選択して、プランを入力するだけで、簡単に旅のしおりが作れます。旅のテーマは、「癒し」「大都会」「出会い」など、あなたの旅に合ったテーマを選択できます。
            v-flex(xs12 md4)
              v-card.py-3(class="elevation-0 transparent")
                v-card-text(class="text-xs-center")
                  img(src="/icons/holding-phone-colour.svg" height="200")
                v-card-title(primary-title class="layout justify-center")
                  div(class="headline") 友達に共有
                v-card-text
                  | 作成した旅のしおりはリンクを送るだけで、友達に簡単に共有できます。旅のプランを他のユーザーに公開したくないときは、リンクを知っているユーザーだけが閲覧できるように設定できます。
            v-flex(xs12 md4)
              v-card.py-3(class="elevation-0 transparent")
                v-card-text(class="text-xs-center")
                  img(src="/icons/hiker-man-colour.svg" height="200")
                v-card-title(primary-title class="layout justify-center")
                  div(class="headline text-xs-center") 旅のプランを探す
                v-card-text
                  | 他のユーザーの旅のしおりから、あなたにぴったりの旅プランを探せます。人気の旅のしおりなどを参考に、次の旅のプランを考えましょう。

  //- 利用イメージ
  section.py-5.primary
    v-layout.px-4(column align-center justify-center text-xs-center)
      div.white--text.headline.mb-3 利用イメージ
      div.white--text.mb-3 あなたの旅を楽しめるように、以下のようなサービスを無料で提供しています。

  section.white.py-5
    v-layout.px-4.pb-4(column wrap align-center)
      v-flex(xs12)
        v-container(grid-list-xl)
          v-layout.text-xs-center(row wrap align-center justify-center)
            v-flex.mb-3(xs12)
              img.elevation-1(src="/travel-brochure.png" height="600")
            v-flex(xs12 md6)
              h1.mb-3.headline 旅のしおりを作成
              div 内容をガイドブックやHPなどをみてまとめてから旅行先の情報などをできるだけ詳細に書いていきます。また観光地だけではなくタイムスケジュールを考える時は宿泊先のホテルや旅館からの距離、交通手段なども工程に入れると良いです。

  v-divider

  section.white.py-5
    v-layout.px-4.pb-4(column wrap align-center)
      v-flex(xs12)
        v-container(grid-list-xl)
          v-layout.text-xs-center(row wrap align-center justify-center)
            v-flex.mb-3(xs12)
              img(src="/icons/travel-tickets-colour.svg" height="250")
            v-flex(xs12 md6)
              h1.mb-3.headline 旅のしおりを共有
              div 旅行の前に友達と旅のプランを共有することで、計画に沿ったスムーズな旅を楽しめます。パスポートやチケットなど、事前に準備するものをメモなどに記載しておくことで、忘れ物がないように気をつけましょう。

  section.py-5.primary
    v-layout.px-4(column align-center justify-center text-xs-center)
      div.white--text.headline.mb-3 さっそくタビシヨを体験する
      v-btn.white--text(flat outline round to='/signup') ユーザー登録へ

</template>

<script>
export default {
  middleware: 'notAuthenticated',
  components: {},
  head() {
    return {
      titleTemplate: null,
      title: 'タビシヨ'
    }
  }
}
</script>
