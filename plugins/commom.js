import Vue from 'vue'
import {constant, mainMessage} from '@/utils/index'

let $message= {
    install(Vue){
        Vue.prototype.$message = mainMessage
    }
}
let $constant= {
  install(Vue){
      Vue.prototype.$constant = constant
  }
}
Vue.use($message)
Vue.use($constant)