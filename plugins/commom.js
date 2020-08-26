import Vue from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
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
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
      hljs.highlightBlock(block)
  })
})
Vue.use($message)
Vue.use($constant)