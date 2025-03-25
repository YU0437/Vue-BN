<script setup>
import {Delete, Edit, InfoFilled, Search, StarFilled} from "@element-plus/icons-vue";
import {onMounted, ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import router from "@/router/index.js";

const item = ref("");
const code = ref("");
const selectRows = ref([]);//选中的行
const data = ref({arr: []});//所有数据
const showData = ref({arr: []});//需要显示的数据,默认显示所有
const searchData = ref({arr: []});//搜索出来的数据
showData.value = data.value;

// 封装加载数据
const loadData = () =>
{
  const savedData = localStorage.getItem("trainingData")
  if(savedData)
  {
    data.value.arr = JSON.parse(savedData)
    showData.value.arr = JSON.parse(savedData)
  }
}
// 从 LocalStorage 加载数据
onMounted(loadData)

//更新数据
function updateDate()
{

  localStorage.setItem("trainingData", JSON.stringify(data.value.arr));
}

//刷新数据
function resetData()
{
  data.value.arr = JSON.parse(localStorage.getItem("trainingData"));
}

//重置
function clear()
{
  item.value = "";
  code.value = "";
  selectRows.value.length = 0;
  showData.value = data.value;
  resetData();
  ElMessage.success('重置成功!');
}

//选中的行
function selected(select)
{
  selectRows.value = select;
}

//删除行
function deleteRow()
{
  if(selectRows.value.length === 0) return ElMessage.warning("请选择需要删除的数据");
  ElMessageBox.confirm('确认删除' + selectRows.value.length + '条数据?', {
    type: 'warning',
    confirmButtonText: "确认",
    cancelButtonText: "取消",
  })
      .then(() =>
      {
        data.value.arr = data.value.arr.filter(
            (row) => !selectRows.value.includes(row));

        searchData.value.arr = searchData.value.arr.filter(
            (row) => !selectRows.value.includes(row));
        updateDate();//更新数据
        selectRows.value = [] // 清空选择
        ElMessage.success("删除成功");
      })
      .catch(() =>
      {
        ElMessage.error("取消删除");
      })
}

//搜索
function searchRows()
{
  if(!item.value && !code.value) return ElMessage.warning("请输入搜索内容");
  //过滤搜索信息
  searchData.value.arr = data.value.arr.filter(row =>
  {
    const codeMatch = code.value ? row.code.includes(code.value) : true;
    const itemMatch = item.value ? row.item.includes(item.value) : true;
    return codeMatch && itemMatch;
  });
  showData.value = searchData.value; //显示搜索的数据
  return ElMessage.success("检索到了" + showData.value.arr.length + "条数据!");
}

function gotoPage(component)
{
  if(component === 'newPage') return router.push('editPage');  //新增页面
  else if(selectRows.value.length !== 1) return ElMessage.warning("请选择一条数据");

  //跳转至修改页面/查看页面
  router.push({
    name: component,
    params: {
      dataArr: JSON.stringify(selectRows.value[0]) // 只传递第一个选中项
    }
  })
}
</script>
<template>
  <!--  固定操作栏-->
  <div class="no-scroll" style="width: 85%">
    <el-row :gutter="50" align="middle">
      <el-col :span="6">
        <span>项目编号</span>
        <el-input v-model="code" clearable placeholder="请输入项目编号"/>
      </el-col>
      <el-col :span="6">
        <span>培训项目</span>
        <el-input v-model="item" clearable placeholder="请输入培训项目"/>
      </el-col>
      <el-col :span="10">
        <el-button-group type="primary" class="action-buttons">
          <el-button @click="searchRows" :icon="Search">搜索</el-button>
          <el-button @click="clear" :icon="Delete">重置</el-button>
          <el-button @click="gotoPage('readPage')" :icon="InfoFilled">查看</el-button>
          <el-button @click="gotoPage('editPage')" :icon="Edit">编辑</el-button>
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
    <el-row>
      <el-table :data="showData.arr" style="width: 95%; " :cell-style="{ padding:
      '25px 0' }"
                v-on:selection-change="selected" row-key="code" height="500px">
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
    </el-row>
  </div>
</template>
<style>
.no-scroll {
  overflow: hidden;
  position: fixed;
}
</style>