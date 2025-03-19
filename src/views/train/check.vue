<template>
  <el-steps :active="activeStep" finish-status="success">
    <el-step title="提交申请"/>
    <el-step title="审核中"/>
    <el-step title="审核通过"/>
  </el-steps>
</template>

<script lang="ts" setup>
import {ref} from 'vue';

const activeStep = ref(1); // 当前步骤
</script>