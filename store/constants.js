import cloneDeep from 'lodash/cloneDeep'

export const BASE_EVENT = {
  type: '',
  title: '',
  overview: '',
  time: ''
}
export const BASE_DAY = {
  date: new Date().toISOString().substr(0, 10),
  events: [cloneDeep(BASE_EVENT)]
}

export const BASE_BROCHURE = {
  title: '',
  overview: '',
  theme: 'healing',
  isPublic: true,
  days: [cloneDeep(BASE_DAY)]
}

export const THEMES = [
  {
    value: 'healing',
    text: '癒し',
    // https://coolors.co/fc8a8a-eaa159-bdea5b-e8d666-ce8ec4
    colors: ['#FC8A8A', '#EAA159', '#BDEA5B', '#E8D666', '#CE8EC4']
  },
  {
    value: 'nature',
    text: '自然',
    // https://coolors.co/app/00a9b9-8de843-e5f9e0-a3f7b5-40c9a2
    colors: ['#00A9B9', '#8DE843', '#FFEE58', '#A3F7B5', '#40C9A2']
  },
  {
    value: 'art',
    text: 'アート',
    // https://coolors.co/app/f00699-454e9e-c82606-018e42-f7d002
    colors: ['#F00699', '#F00699', '#C82606', '#018E42', '#F7D002']
  },
  {
    value: 'metoropolitan',
    text: '大都市',
    // https://coolors.co/app/98828b-acaab4-403937-d6594a-4261ad
    colors: ['#98828B', '#ACAAB4', '#403937', '#D6594A', '#4261AD']
  },
  {
    value: 'gourmet',
    text: 'グルメ',
    // https://coolors.co/app/a84b07-d44f07-2a1c13-f7d95d-b88a2d
    colors: ['#A84B07', '#D44F07', '#2A1C13', '#F7D95D', '#B88A2D']
  },
  {
    value: 'adventure',
    text: '冒険',
    // https://coolors.co/507656-b7ad6e-dfac46-d27135-c44f2d
    colors: ['#507656', '#B7AD6E', '#DFAC46', '#D27135', '#C44F2D']
  },
  {
    value: 'encounter',
    text: '出会い',
    // https://coolors.co/651696-4b279e-3756ad-39ce9a-32e59d
    colors: ['#651696', '#FC2D98', '#3756AD', '#39CE9A', '#32E59D']
  },
  {
    value: 'twilight',
    text: '黄昏',
    // https://www.color-hex.com/color-palette/74390
    colors: ['#ffa951', '#ff975e', '#ff7f54', '#f95c5c', '#e54b4b']
  }
]

export const EVENT_TYPES = [
  // Transportation
  { value: 'train', text: '電車', category: 'transportation' },
  { value: 'directions_subway', text: '地下鉄', category: 'transportation' },
  { value: 'directions_car', text: '車', category: 'transportation' },
  { value: 'directions_walk', text: '徒歩', category: 'transportation' },
  { value: 'directions_bike', text: 'バイク', category: 'transportation' },
  { value: 'directions_boat', text: 'ボート', category: 'transportation' },
  { value: 'directions_bus', text: 'バス', category: 'transportation' },
  { value: 'directions_subway', text: '地下鉄', category: 'transportation' },
  { value: 'directions_walk', text: '徒歩', category: 'transportation' },
  { value: 'flight_takeoff', text: '飛行機（離陸）', category: 'transportation' },
  { value: 'flight_land', text: '飛行機（着陸）', category: 'transportation' },
  { value: 'local_parking', text: '駐車場', category: 'transportation' },

  // Leisure
  { value: 'movie', text: '映画', category: 'leisure' },
  { value: 'beach_access', text: 'ビーチ', category: 'leisure' },
  { value: 'fitness_center', text: 'フィットネス', category: 'leisure' },
  { value: 'golf_course', text: 'ゴルフ', category: 'leisure' },
  { value: 'hot_tub', text: 'お風呂', category: 'leisure' },
  { value: 'pool', text: 'プール', category: 'leisure' },
  { value: 'casino', text: 'カジノ', category: 'leisure' },
  { value: 'pets', text: '動物', category: 'leisure' },

  // Sightseeing
  { value: 'shopping_cart', text: 'ショッピング', category: 'sightseeing' },
  { value: 'camera_alt', text: 'カメラ', category: 'sightseeing' },
  { value: 'panorama', text: '写真', category: 'sightseeing' },
  { value: 'home', text: '家', category: 'sightseeing' },
  { value: 'hotel', text: 'ホテル', category: 'sightseeing' },
  { value: 'work', text: '仕事', category: 'sightseeing' },
  { value: 'school', text: '学校', category: 'sightseeing' },

  // Food
  { value: 'fastfood', text: '軽食', category: 'food' },
  { value: 'local_bar', text: 'バー', category: 'food' },
  { value: 'local_cafe', text: 'カフェ', category: 'food' },
  { value: 'cake', text: 'ケーキ', category: 'food' },
  { value: 'local_dining', text: 'レストラン', category: 'food' },

  // Others
  { value: 'star', text: '星', category: 'other' },
  { value: 'favorite', text: 'ハート', category: 'other' },
  { value: 'help', text: '秘密', category: 'other' },
  { value: 'flag', text: 'フラグ', category: 'other' },
  { value: 'location_on', text: 'ロケーション', category: 'other' },
  { value: 'person', text: 'ユーザー', category: 'other' },
  { value: 'people', text: '友達', category: 'other' },
  { value: 'notifications', text: '通知', category: 'other' },
  { value: '', text: '選択なし', category: 'other' }
]

export const getColor = (themeValue, eventTypeValue) => {
  const theme = THEMES.find(theme => {
    return theme.value === themeValue
  })
  const eventType = EVENT_TYPES.find(eventType => {
    return eventType.value === eventTypeValue
  })
  switch (eventType.category) {
    case 'transportation':
      return theme.colors[0]
    case 'leisure':
      return theme.colors[1]
    case 'sightseeing':
      return theme.colors[2]
    case 'food':
      return theme.colors[3]
    case 'other':
      return theme.colors[4]
    default:
      return theme.colors[4]
  }
}
