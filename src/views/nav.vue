<script setup>
import plan from "@/views/train/plan.vue";
import {ref, watch} from "vue";
import {useRoute} from "vue-router";
import Review from "@/views/train/review.vue";
import {User} from "@element-plus/icons-vue";

const route = useRoute();
const formData = ref({});
const currentComponent = ref(plan);
const currentSelectProps = ref("");
watch(
    () => route.params.formData,
    (newValue) =>
    {
      if(newValue) formData.value = JSON.parse(newValue);
    }, {immediate: true}
);

function goto(component, status)
{
  currentComponent.value = component;
  currentSelectProps.value = status;
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
        <el-menu class="nav" background-color="#39485a" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="1">首页</el-menu-item>
          <el-sub-menu index="2">
            <template #title>培训管理</template>
            <el-menu-item index="2-1" @click="goto(plan)">培训计划</el-menu-item>
            <el-sub-menu index="2-2">
              <template #title>项目审核</template>
              <el-menu-item index="2-2-1" @click="goto(Review)">所有项目</el-menu-item>
              <el-menu-item index="2-2-2" @click="goto(Review,'pass')">审核成功
              </el-menu-item>
              <el-menu-item index="2-2-3" @click="goto(Review,'wait')">审核进行中</el-menu-item>
              <el-menu-item index="2-2-3" @click="goto(Review,'fail')">审核失败</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
      </el-aside>

      <!-- 内容区域 -->
      <el-main class="content">
        <component :is="currentComponent" :formData="formData" :currentSelectProps="currentSelectProps"/>
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
  /* 固定定位，始终保持在视口顶部 */
  position: fixed;
  top: 0;
  left: 0;
  /* 宽度占满整个视口 */
  width: 100%;
  /* 确保导航栏在最上层，避免被其他元素遮挡 */
  z-index: 1000;
  /* 135度线性渐变*/
  background: linear-gradient(135deg, #3fddbd 0%, #52b0c5 100%);
  /* 添加轻微阴影效果，增加层次感 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: 60px;
  /* 使用flex布局，子元素垂直居中 */
  display: flex;
  align-items: center;
}


.menu {
  width: 100%;
  /* 背景透明，覆盖element-plus默认样式 */
  background: transparent;
  /* 移除底部边框 */
  border-bottom: none;
}

.main-container {
  flex: 1;
  display: flex;
  padding-top: 60px; /* 顶部栏高度，避免内容被遮挡 */
}

/* 侧边栏容器样式 */
.aside {
  position: fixed;
  top: 60px; /* 与顶部导航栏高度一致 */
  left: 0;
  width: 220px; /* 适当加宽 */
  height: calc(100vh - 60px);
  z-index: 999;
  background: #39485a; /* 更深的背景色 */
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.1); /* 添加阴影 */
  transition: width 0.3s ease; /* 添加过渡动画 */
}

/* 导航菜单样式 */
.nav {
  height: 100%;
  border-right: none;
  background-color: #304156 !important;
}

/* 菜单项样式 */
.el-menu-item, .el-sub-menu__title {
  color: #bfcbd9 !important;
  height: 56px;
  line-height: 56px;
}

/* 菜单项悬停和激活状态 */
.el-menu-item:hover,
.el-sub-menu__title:hover,
.el-menu-item.is-active {
  background-color: #263445 !important;
  color: #409EFF !important;
}

/* 子菜单项样式 */
.el-menu--inline {
  background-color: #1f2d3d !important;
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