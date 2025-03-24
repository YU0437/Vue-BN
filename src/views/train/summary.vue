<script setup>
import {onMounted, ref} from "vue";
import {dayjs, ElMessage} from "element-plus";

const selectRows = ref([]);//被选中的数据
const data = ref({arr: []});//所有数据
const dataSelect = ref(null); // 用于存储选中的单条数据
const reviewData = ref({arr: []});
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
  //更新数据
  data.value.arr = JSON.parse(localStorage.getItem("trainingData"));
}


function selected(select)
{
  selectRows.value = select;
  dataSelect.value = select[0]; // 更新选中的单条数据
}

function review()
{
  if(selectRows.value.length !== 1) return ElMessage.warning("请选中一条数据");
  ElMessage.success("项目:" + dataSelect.value.code + "已通过审核!");
  dataSelect.value.reviewTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
  dataSelect.value.isPassReview = true;
  console.log(dataSelect.value)
  // reviewData.value.arr = data.value.arr.filter(obj =>
  // {
  //   obj.isPassReview = true;
  // });

  updateDate();
}

function FailReview()
{
  if(selectRows.value.length !== 1) return ElMessage.warning("请选中一条数据");
  ElMessage.success("项目:" + dataSelect.value.code + "未通过审核!");
  dataSelect.value.reviewTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
  dataSelect.value.isPassReview = false;
  updateDate();
}
</script>
<template>

  <el-table :data="data.arr" style="width:85%;position: fixed " :cell-style="{ padding: '25px 0' }"
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
  <!-- 审核信息 -->
  <el-affix position="bottom" :offset="0">
    <el-card class="card" header="审核" style="text-align: center;position: fixed;width: 85%;height: 18%">
      <div class="action-buttons">
        <el-button type="success" @click="review">通过审核</el-button>
        <el-button type="warning" @click="FailReview">未通过审核</el-button>
      </div>
    </el-card>
  </el-affix>
</template>

<style scoped>
.card {
  background-color: #d7e0e6;
  width: 100%; /* 让卡片占满宽度 */
  font-size: 14px;
  font-weight: bolder;
  box-sizing: border-box; /* 确保 padding 不会影响宽度 */
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 10px; /* 按钮之间的间距 */
}
</style>