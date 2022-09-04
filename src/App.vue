<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style lang="scss">
@import 'uview-plus/index.scss';
@import 'static/icon/iconfont.css';
@import 'static/css/base.css';
@import 'static/css/mixn.scss';
@import 'static/css/common.scss';

/* 条件编译，仅在H5平台生效 */
// #ifdef H5
body::-webkit-scrollbar,
html::-webkit-scrollbar {
  display: none;
}
// #endif
</style>
