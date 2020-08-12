//引入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//Nprogress的基本配置
NProgress.configure({ showSpinner: false })

export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
  });
  app.router.afterEach(() => {
    NProgress.done()
    window.scrollTo(0, 0);
  });
}