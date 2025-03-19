import {createRouter, createWebHistory} from 'vue-router'; // 引入 Vue 3 的路由函数
import login from "@/views/login.vue";
import plan from "@/views/train/plan.vue";
import nav from "@/views/nav.vue";
import readPage from "@/views/train/readPage.vue";
import editPage from "@/views/train/editPage.vue";
// 定义路由
const routes = [
	{
		path: '/', // 路由路径
		name: 'login', // 登录
		component: login, // 对应的组件
	},
	{
		path: '/index', // 路由路径
		name: 'index', // 首页
		component: nav, // 对应的组件
	},
	{
		path: '/plan', // 路由路径
		name: 'plan',
		component: plan, // 对应的组件
	},
	{
		path: '/readPage', // 路由路径
		name: 'readPage',
		component: readPage, // 对应的组件
	},
	{
		path: '/editPage', // 路由路径
		name: 'editPage',
		component: editPage, // 对应的组件
	},
];

// 创建路由实例
const router = createRouter({
	history: createWebHistory(), // 使用 HTML5 历史模式
	routes, // 路由配置
});

export default router; // 导出路由实例