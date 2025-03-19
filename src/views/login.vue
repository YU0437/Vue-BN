<script setup>
import {ref} from "vue";
import router from "@/router/index.js";

const name = ref("");
const password = ref("");

function goto()
{
  router.push("index");
}
</script>

<template>
  <!-- 背景视频 -->
  <div style="position: relative; height: 100vh; overflow: hidden;">
    <video
        autoplay
        muted
        loop
        style="
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;">
      <source src="/src/assets/video/Login.mp4" type="video/mp4"/>
    </video>

    <!-- 登录卡片 -->
    <div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 1;">
      <el-card style="width: 300px; background-color: rgba(255, 255, 255, 0.75);">
        <h3 class="login">用户登录</h3>
        <h6 class="login">LOGIN</h6>
        <el-input v-model="name" placeholder="请输入用户名" clearable style="margin-bottom: 15px;"/>
        <el-input v-model="password" placeholder="请输入密码" show-password style="margin-bottom: 20px;"/>
        <el-button type="primary" @click="goto" style="width: 100%; margin-bottom: 10px;">登录</el-button>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.login {
  text-align: center;
}

</style>