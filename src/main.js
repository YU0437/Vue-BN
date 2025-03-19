import {createApp} from 'vue'; // 导入 createApp
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'; // 导入根组件
import router from './router'; // 导入路由配置
import * as ElementPlusIconsVue from '@element-plus/icons-vue' //导入 ElementPlus 组件库中的所有图标

// 创建 Vue 应用实例并使用路由
const app = createApp(App); // 创建应用实例
//注册 ElementPlus 组件库中的所有图标到全局 Vue 应用中
for (const [key, component] of Object.entries(ElementPlusIconsVue))
{
	app.component(key, component)
}
app.use(router); // 使用路由
app.use(ElementPlus)
app.mount('#app'); // 挂载到 DOM






