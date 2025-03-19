<script setup>
import plan from "@/views/train/plan.vue";
import {ref, watch} from "vue";
import {useRoute} from "vue-router";
import check from "@/views/train/check.vue";
import summary from "@/views/train/summary.vue";
import {User} from "@element-plus/icons-vue";

const route = useRoute();
const formData = ref({});
const currentComponent = ref(plan);

watch(
    () => route.params.formData, // 监听的目标
    (newValue) => { // 回调函数
      if (newValue) formData.value = JSON.parse(newValue);
    }, {immediate: true}
);

function goto(component)
{
  currentComponent.value = component;
}
</script>

<template>
  <div class="container">
    <!-- 顶部导航栏 -->
    <el-header class="header">
      <el-menu mode="horizontal" class="menu">
        <div class="title-container">
          <span>航站协同运管理系统T-CDM</span>
          <span>西安咸阳国际机场</span>
        </div>
        <div class="admin">
          <el-dropdown>
            <span>admin<el-icon><User/></el-icon></span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-menu>

    </el-header>

    <!-- 主体内容区域 -->
    <el-container class="main-container">
      <!-- 左侧导航栏 -->
      <el-aside width="200px" class="aside">
        <el-menu class="nav" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="1">首页</el-menu-item>
          <el-sub-menu index="2">
            <template #title>培训管理</template>
            <el-menu-item index="2-1" @click="goto(plan)">培训计划</el-menu-item>
            <el-menu-item index="2-2" @click="goto(check)">培训总结</el-menu-item>
            <el-menu-item index="2-3" @click="goto(summary)">培训考核</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>

      <!-- 内容区域 -->
      <el-main class="content">
        <component :is="currentComponent" :formData="formData"/>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column; /* 垂直布局 */
  height: 100vh; /* 容器高度为视口高度 */
}

.header {
  width: 100%; /* 顶部导航栏宽度占满 */
  background-color: rgba(63, 221, 189, 0.25); /* 背景色 */
}

.menu {
  background-color: #91b6cc; /* 背景色 */
  border-bottom: 1px solid #52b0c5; /* 底部边框 */
}

.main-container {
  flex: 1; /* 主体内容区域占据剩余空间 */
  display: flex; /* 启用 Flex 布局 */
}

.aside {
  width: 200px; /* 左侧导航栏宽度固定 */
  background-color: #545c64; /* 背景色 */
}

.content {
  flex: 1; /* 内容区域占据剩余空间 */
  padding: 20px; /* 内边距 */
}

.title-container {
  display: flex;
  flex-direction: column; /* 垂直排列 */
  margin-right: 20px; /* 与右侧菜单项的间距 */
}

.admin {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
  font-size: 14px; /* 字体大小 */
  color: #303133; /* 字体颜色 */
  cursor: pointer; /* 鼠标悬停时显示手型 */
}
</style>