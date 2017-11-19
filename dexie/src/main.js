import Vue from 'vue'

Vue.config.productionTip = false

Vue.prototype.$isDevMode = process.env.NODE_ENV !== 'production'
