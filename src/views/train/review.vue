<script setup>
import {onMounted, ref, computed} from "vue";
import {dayjs, ElMessage} from "element-plus";

const selectRows = ref([]); // 被选中的数据
const data = ref({arr: []}); // 原始数据
const dataSelect = ref(null); // 用于存储选中的单条数据

// 使用 computed 实现过滤
const filteredData = computed(() =>
{
  if(!props.currentSelectProps) return data.value.arr;
  if(props.currentSelectProps === 'wait')
  {
    return data.value.arr.filter(obj =>
        obj.isPassReview === null || obj.isPassReview === undefined
    );
  }
  else if(props.currentSelectProps === 'pass')
  {
    return data.value.arr.filter(obj =>
        obj.isPassReview === true
    );
  }
  else if(props.currentSelectProps === 'fail')
  {
    return data.value.arr.filter(obj =>
        obj.isPassReview === false
    );
  }

  return data.value.arr;
});

// 定义 props
const props = defineProps({
  currentSelectProps: {
    type: String,
    default: ''
  }
});

// 从 LocalStorage 加载数据
onMounted(() =>
{
  const savedData = localStorage.getItem("trainingData");
  if(savedData) data.value.arr = JSON.parse(savedData);
});

function updateDate()
{
  localStorage.setItem("trainingData", JSON.stringify(data.value.arr));
}

function selected(select)
{
  selectRows.value = select;
  dataSelect.value = select[0];
}

function review()
{
  if(selectRows.value.length !== 1) return ElMessage.warning("请选中一条数据");
  ElMessage.success("项目:" + dataSelect.value.code + "已通过审核!");
  dataSelect.value.reviewTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
  dataSelect.value.isPassReview = true;
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
  <div class="no-scroll" style="width: 85%">
    <el-row>
      <el-table :data="filteredData" style="width: 98%; " :cell-style="{ padding:
      '25px 0' }"
                v-on:selection-change="selected" row-key="code" height="450px">
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
    <!-- 审核信息 -->
    <el-card class="card" header="审核">
      <div class="action-buttons">
        <el-button type="success" @click="review">通过审核</el-button>
        <el-button type="warning" @click="FailReview">未通过审核</el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.card {
  background-color: #d7e0e6;
  font-size: 14px;
  font-weight: bolder;
  box-sizing: border-box; /* 确保 padding 不会影响宽度 */
  text-align: center;
  width: 70%;
  margin: 0 auto; /* 水平居中 */
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 10px; /* 按钮之间的间距 */
}
</style>