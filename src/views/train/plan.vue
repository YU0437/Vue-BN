<script setup>
import {Delete, Edit, InfoFilled, Search, StarFilled} from "@element-plus/icons-vue";
import {onMounted, ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import router from "@/router/index.js";

const item = ref("");
const code = ref("");
const selectRows = ref([]);
const data = ref({arr: []});
// 从 LocalStorage 加载数据
onMounted(() =>
{
  const savedData = localStorage.getItem("trainingData");
  if(savedData) data.value.arr = JSON.parse(savedData);
});

function updateDate()
{
  //更新数据
  localStorage.setItem("trainingData", JSON.stringify(data.value.arr));
}

function resetDate()
{
  data.value.arr = JSON.parse(localStorage.getItem("trainingData"));//更新数据
}

function clear()
{
  item.value = "";
  code.value = "";
  selectRows.value.length = 0;
  resetDate();
  ElMessage.success('重置成功!',);
  console.log(data.value.arr)
}

function selected(select)
{
  selectRows.value = select;
}

function deleteRow()
{
  if(selectRows.value.length === 0) return;
  ElMessageBox.confirm('确认删除', '标题', {
    type: 'warning',
    confirmButtonText: "确认",
    cancelButtonText: "取消",
  })
      .then(() =>
      {
        data.value.arr = data.value.arr.filter(
            (row) => !selectRows.value.includes(row));
        updateDate();//更新数据
        ElMessage.success("删除成功");
      })
      .catch(() =>
      {
        ElMessage.info("取消删除");
      })
}

function searchRows()
{

  if(!item.value && !code.value) return ElMessage.warning("请输入搜索内容");
  data.value.arr = data.value.arr.filter(row =>
  {
    if(row.code) return row.code.includes(code.value)
  });//过滤搜索信息
  return ElMessage.success("检索到了" + data.value.arr.length + "条数据!");
}

function gotoPage(component)
{
  if(component === 'newPage') return router.push('editPage');//新增页面
  else if(selectRows.value.length !== 1) return ElMessage.warning("请选择一条数据");

  router.push({
    name: component,//查看/编辑页面 传入选中的数据
    params: {dataArr: JSON.stringify(data.value.arr[selectRows.value.map((row) => data.value.arr.indexOf(row))])},
  })
}
</script>
<template>
  <el-row :gutter="50" align="middle">
    <el-col :span="6">
      <span>项目编号</span>
      <el-input v-model="code" clearable placeholder="请输入项目编号"/>
    </el-col>
    <el-col :span="6">
      <span>培训项目</span>
      <el-input v-model="item" clearable placeholder="请输入培训项目"/>
    </el-col>
    <el-col :span="8">
      <el-button-group type="primary">
        <el-button v-on:click="searchRows" :icon="Search">搜索</el-button>
        <el-button v-on:click="clear" :icon="Delete">重置</el-button>
        <el-button v-on:click="gotoPage('readPage')" :icon="InfoFilled">查看</el-button>
        <el-button v-on:click="gotoPage('editPage')" :icon="Edit">编辑</el-button>
      </el-button-group>
    </el-col>
  </el-row>
  <el-divider>
    <el-icon>
      <star-filled/>
    </el-icon>
  </el-divider>
  <el-button type="primary" v-on:click="gotoPage('newPage')">新增</el-button>
  <el-button type="danger" v-on:click="deleteRow">删除</el-button>
  <el-button type="warning">导出</el-button>

  <el-table :data="data.arr" style="width: 1400px; " :cell-style="{ padding: '25px 0' }"
            v-on:selection-change="selected" row-key="code">
    <el-table-column type="selection"/>
    <el-table-column label="序号" type="index" width="80"/>
    <el-table-column label="项目编号" prop="code"/>
    <el-table-column label="培训项目" prop="item"/>
    <el-table-column label="计划类别" prop="plan_sort"/>
    <el-table-column label="组织部门/编码" prop="org_code"/>
    <el-table-column label="实施部门/编码" prop="implement"/>
    <el-table-column label="培训对象" prop="train_op"/>
    <el-table-column label="培训时间" prop="train_time"/>
    <el-table-column label="培训方式" prop="train_way"/>
    <el-table-column label="培训分类" prop="train_sort"/>
    <el-table-column label="创建时间" prop="createTime"/>
    <el-table-column label="培训情况" prop="train_status"/>
  </el-table>
</template>

<style scoped>

</style>