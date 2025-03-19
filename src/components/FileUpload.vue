<template>
  <div>
    <!-- 文件上传按钮 -->
    <el-upload
        :auto-upload="false"
        :on-change="handleUpload"
        :on-remove="handleRemove"
    >
      <el-button type="primary">上传文件</el-button>
    </el-upload>

    <!-- 文件列表展示 -->
    <div v-if="fileList.length > 0" style="margin-top: 20px;">
      <h3>已上传文件：</h3>
      <ul>
        <li v-for="file in fileList" :key="file.name" style="margin-bottom: 10px;">
          {{ file.name }}
          <el-button type="success" size="small" @click="handleDownload(file.name)">
            下载
          </el-button>
          <el-button type="danger" size="small" @click="handleRemove(file.name)">
            删除
          </el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import type {UploadProps} from 'element-plus';
import {ElMessage} from 'element-plus';

// 文件列表
const fileList = ref<{ name: string; url: string }[]>([]);

// 文件上传
const handleUpload: UploadProps['onChange'] = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const base64 = e.target?.result as string;
    // 存储到 localStorage
    localStorage.setItem(file.name, base64);
    // 更新文件列表
    fileList.value = [...fileList.value, {name: file.name, url: base64}];
    ElMessage.success(`${file.name} 上传成功`);
  };
  reader.readAsDataURL(file.raw);
};

// 文件删除
const handleRemove = (fileName: string) => {
  // 从 localStorage 中删除
  localStorage.removeItem(fileName);

  // 找到要删除的文件索引
  const index = fileList.value.findIndex((file) => file.name === fileName);
  if (index !== -1) {
    // 使用 splice 删除文件
    fileList.value.splice(index, 1);
    ElMessage.success(`${fileName} 删除成功!`);
  } else {
    ElMessage.error('文件不存在');
  }
};

// 文件下载
const handleDownload = (fileName: string) => {
  const base64 = localStorage.getItem(fileName);
  if (!base64) {
    ElMessage.error('文件不存在');
    return;
  }

  const byteCharacters = atob(base64.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], {type: 'application/octet-stream'});

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// 暴露文件列表给父组件
defineExpose({
  fileList,
});
</script>