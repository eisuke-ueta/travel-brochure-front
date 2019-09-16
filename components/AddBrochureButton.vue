<template lang="pug">
v-tooltip(top)
  template(v-slot:activator="{ on }")
    v-btn.ma-3(to='/brochure' color="primary" dark fixed bottom right fab v-on="on")
      v-icon add
  span 旅のしおりを作成
</template>
