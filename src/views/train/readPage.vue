<script setup>
import {ref, watch} from "vue";
import {useRoute} from "vue-router";
import router from "@/router/index.js";

const route = useRoute();
const dataArr = ref({});
const name = "createTime"
// 监听路由参数变化
watch(
    () => route.params.dataArr,
    (newValue) => {
      if (newValue) dataArr.value = JSON.parse(newValue);
    }, {immediate: true}
);
// 计划信息
const planItems = ref([
  {name: 'code', label: '项目编号'},
  {name: 'item', label: '项目培训'},
  {name: 'plan_sort', label: '计划类别'},
  {name: 'train_time', label: '培训时间'},
  {name: 'org_code', label: '组织部门/编码'},
  {name: 'implement', label: '实施部门/编码'},
  {name: 'train_op', label: '培训对象'},
  {name: 'participants', label: '计划参训人数(人)'},
  {name: 'trainingLocation', label: '培训地点'},
]);

// 培训信息
const infoItems = ref([
  {name: 'train_way', label: '培训方式'},
  {name: 'train_sort', label: '培训分类'},
  {name: 'trainingHours', label: '培训课时(小时)'},
  {name: 'trainingTeacher', label: '培训师资'},
  {name: 'trainingDirection', label: '培训方向'},
  {name: 'trainingType', label: '培训类别'},
  {name: 'remark', label: '备注'},
]);

// 预算信息
const countItems = ref([
  {name: 'travelCost', label: '差旅费(元)'},
  {name: 'trainingCost', label: '培训费(元)'},
  {name: 'totalBudget', label: '总预算(元)'},
]);

function goto(component)
{
  //返回主页和功能页
  router.push(component)
}
</script>

<template>

  <!-- 计划信息 -->
  <el-card class="card" header="计划信息">
    <el-row :gutter="10">
      <el-col :span="8" v-for="item in planItems" :key="item.name">
        <el-form-item>
          <el-text>
            {{ item.label }}:
            {{ Array.isArray(dataArr[item.name]) ? dataArr[item.name].join(', ') : dataArr[item.name] || '暂无数据' }}
          </el-text>
        </el-form-item>
      </el-col>
    </el-row>
  </el-card>
  <!-- 培训信息 -->
  <el-card class="card" header="培训信息">
    <el-row gutter="10">
      <el-col :span="8" v-for="item in infoItems" :key="item.name">
        <el-form-item>
          <el-text>
            {{ item.label }}: {{ dataArr[item.name] || '暂无数据' }}
          </el-text>
        </el-form-item>
      </el-col>
    </el-row>
  </el-card>

  <!-- 预算信息 -->
  <el-card class="card" header="预算信息">
    <el-row gutter="10">
      <el-col v-for="item in countItems" :key="item.name" :span="8">
        <el-form-item>
          <el-text>
            {{ item.label }}: {{ dataArr[item.name] || '暂无数据' }}<br/>
          </el-text>
        </el-form-item>
      </el-col>
    </el-row>
  </el-card>
  <div style="display: grid; place-items: center;">
    <el-button type="primary" v-on:click="goto('index')">返回</el-button>
  </div>
  <!-- 审核信息 -->
  <el-card class="card" header="审核信息">
    s

    <span>提交申请</span>{{ dataArr[name] }}
    <span>申请人员:双流机场指挥部/系统管理员</span>
    <!--      <span>提交申请</span>{{ dataArr["createTime"] }}-->
    <!--      <span>审核人员:双流机场指挥部/固定审核人</span>-->

  </el-card>
</template>

<style scoped>
.card {
  background-color: #d7e0e6;
  align-items: flex-start;
  padding: 5px;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: bolder;
}
</style>