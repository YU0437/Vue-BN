<script setup>
import plan from "@/views/train/plan.vue";
import {ref, watch} from "vue";
import {useRoute} from "vue-router";
import summary from "@/views/train/summary.vue";
import {User} from "@element-plus/icons-vue";

const route = useRoute();
const formData = ref({});
const currentComponent = ref(plan);

watch(
    () => route.params.formData,
    (newValue) =>
    {
      if(newValue) formData.value = JSON.parse(newValue);
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
      <el-aside class="aside">
        <el-menu class="nav" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="1">首页</el-menu-item>
          <el-sub-menu index="2">
            <template #title>培训管理</template>
            <el-menu-item index="2-1" @click="goto(plan)">培训计划</el-menu-item>
            <el-sub-menu index="2-2">
              <template #title>项目审核</template>
              <el-menu-item index="2-2-1" @click="goto(summary)">所有项目</el-menu-item>
              <el-menu-item index="2-2-2">已审核项目</el-menu-item>
              <el-menu-item index="2-2-3">未审核项目</el-menu-item>
            </el-sub-menu>
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
  flex-direction: column;
  height: 100vh;
}

.header {
  position: fixed; /* 固定定位 */
  top: 0; /* 固定在顶部 */
  left: 0; /* 左侧对齐 */
  width: 100%; /* 宽度占满 */
  z-index: 1000; /* 确保顶部栏在最上层 */
  background-color: rgba(63, 221, 189, 0.25);
}

.menu {
  background-color: #91b6cc;
  border-bottom: 1px solid #52b0c5;
}

.main-container {
  flex: 1;
  display: flex;
  padding-top: 60px; /* 顶部栏高度，避免内容被遮挡 */
}

.aside {
  position: fixed; /* 固定定位 */
  top: 60px; /* 顶部栏高度，避免重叠 */
  left: 0; /* 左侧对齐 */
  width: 200px; /* 固定宽度 */
  height: calc(100vh - 60px); /* 高度为视口高度减去顶部栏高度 */
  z-index: 999; /* 确保侧边栏在内容区域上层 */
  background-color: #545c64;
}

.content {
  flex: 1;
  padding: 20px;
  padding-left: 220px; /* 侧边栏宽度 + 间距，避免内容被遮挡 */
  overflow-y: auto; /* 内容区域可滚动 */
}

.title-container {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
}

.admin {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #303133;
  cursor: pointer;
}
</style>