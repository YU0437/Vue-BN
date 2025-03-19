<script setup>
import {onMounted, ref, watch} from "vue";
import router from "@/router/index.js";
import {useRoute} from "vue-router";
import {ElMessage} from "element-plus";

// 接收需要的数据
const route = useRoute();
const dataArr = ref({});
let index = ref('');
let trainingData;

// 监听路由参数变化
watch(
    () => route.params.dataArr,
    (newValue) => {
      if (newValue) dataArr.value = JSON.parse(newValue);
    },
    {immediate: true}
);

onMounted(() => {
  const savedData = localStorage.getItem("trainingData");
  if (savedData)
  {
    trainingData = JSON.parse(savedData);
    index = trainingData.findIndex(item => item.code === dataArr.value.code);
    if (index !== -1)
    {
      [...planItems.value, ...infoItems.value, ...countItems.value].forEach(item => {
        item.value = dataArr.value[item.name];
      });
    }
  }
});

// 计划信息
const planItems = ref([
  {name: 'code', label: '项目编号', placeholder: '请输入项目编号', value: '', type: 'input'},
  {name: 'item', label: '项目培训', placeholder: '请输入培训项目', value: '', type: 'input'},
  {
    name: 'plan_sort',
    label: '计划类别',
    placeholder: '请选择计划类别',
    value: '',
    type: 'select',
    option: [
      {label: '年度计划', value: '年度计划'},
      {label: '季度计划', value: '季度计划'},
      {label: '月度计划', value: '月度计划'},
      {label: '周计划', value: '周计划'},
    ],
  },
  {
    name: 'train_time',
    label: '培训时间',
    placeholder: '请选择培训时间',
    value: [],
    type: 'multiplySelect',
    option: [
      {label: '一季度', value: '一季度'},
      {label: '二季度', value: '二季度'},
      {label: '三季度', value: '三季度'},
      {label: '四季度', value: '四季度'},
    ],
  },
  {name: 'org_code', label: '组织部门/编码', placeholder: '请选择组织部门/编码', value: '', type: 'input'},
  {name: 'implement', label: '实施部门/编码', placeholder: '请选择实施部门/编码', value: '', type: 'input'},
  {name: 'train_op', label: '培训对象', placeholder: '请输入培训对象', value: '', type: 'input'},
  {name: 'participants', label: '计划参训人数(人)', placeholder: '请输入计划参训人数(人)', value: '', type: 'input'},
  {name: 'trainingLocation', label: '培训地点', placeholder: '请输入培训地点', value: '', type: 'input'},
]);

// 培训信息
const infoItems = ref([
  {
    name: 'train_way',
    label: '培训方式',
    placeholder: '请输入培训方式',
    value: '',
    type: 'select',
    option: [
      {label: '内培', value: '内培'},
      {label: '外培', value: '外培'},
      {label: '统培', value: '统培'},
    ],
  },
  {
    name: 'train_sort',
    label: '培训分类',
    placeholder: '请输入培训分类',
    value: '',
    type: 'select',
    option: [
      {label: '软件培训', value: '软件培训'},
      {label: '游戏培训', value: '游戏培训'},
      {label: '资格证书', value: '资格证书'},
    ],
  },
  {name: 'trainingHours', label: '培训课时(小时)', placeholder: '请输入培训课时(小时)', value: '', type: 'input'},
  {
    name: 'trainingTeacher',
    label: '培训师资',
    placeholder: '请输入培训师资',
    value: '',
    type: 'select',
    option: [
      {label: '内部', value: '内部'},
      {label: '外部', value: '外部'},
      {label: '总部', value: '总部'},
    ],
  },
  {
    name: 'trainingDirection',
    label: '培训方向',
    placeholder: '请输入培训方向',
    value: '',
    type: 'select',
    option: [
      {label: 'Java方向', value: 'Java方向'},
      {label: '前端方向', value: '前端方向'},
      {label: '运维方向', value: '运维方向'},
      {label: '党工团建设', value: '党工团建设'},
    ],
  },
  {
    name: 'trainingType',
    label: '培训类别',
    placeholder: '请输入培训类别',
    value: '',
    type: 'select',
    option: [
      {label: '应急救援', value: '应急救援'},
      {label: '销售口才', value: '销售口才'},
      {label: '编程开发', value: '编程开发'},
    ],
  },
  {name: 'remark', label: '备注', placeholder: '请输入备注', value: '', type: 'textarea'},
]);

// 预算信息
const countItems = ref([
  {name: 'travelCost', label: '差旅费(元)', placeholder: '请输入差旅费', value: '', type: 'input'},
  {name: 'trainingCost', label: '培训费(元)', placeholder: '请输入培训费', value: '', type: 'input'},
  {name: 'totalBudget', label: '总预算(元)', placeholder: '', value: '', type: 'counter'},
]);

// 表单验证规则
const rules = ref({
  train_way: [{required: true, message: "培训方式不能为空", trigger: 'submit'}],
  train_sort: [{required: true, message: "培训类别不能为空", trigger: 'submit'}],
  trainingHours: [{required: true, message: "培训小时不能为空", trigger: 'submit'}],
  trainingTeacher: [{required: true, message: "培训师资不能为空", trigger: 'submit'}],
});

// 动态添加验证规则
planItems.value.forEach(obj => {
  rules.value[obj.name] = [{required: true, message: `${obj.label}不能为空`, trigger: 'submit'}];
});

// 计算总预算
function counter()
{
  let sum = 0;
  countItems.value.forEach(obj => {
    sum += parseFloat(obj.value) || 0;
  });
  return sum;
}

// 提交表单
function submitForm()
{
  [...planItems.value, ...infoItems.value, ...countItems.value].forEach(item => {
    dataArr.value[item.name] = item.value;
  });
  trainingData[index] = dataArr.value;
  localStorage.setItem("trainingData", JSON.stringify(trainingData));
  ElMessage.success("数据保存成功");
  router.push({name: 'index'});
}
</script>

<template>
  <div class="page-container">
    <el-card class="form-card">
      <el-form label-width="120px" :rules="rules" ref="formEl">
        <!-- 计划信息 -->
        <el-card class="section-card" header="计划信息">
          <el-row :gutter="20">
            <el-col v-for="item in planItems" :span="8" :key="item.name">
              <el-form-item :label="item.label" :prop="item.name">
                <el-select
                    v-if="item.type === 'multiplySelect'"
                    v-model="item.value"
                    :placeholder="item.placeholder"
                    multiple
                    clearable
                >
                  <el-option v-for="op in item.option" :key="op.value" :label="op.label" :value="op.value"/>
                </el-select>
                <el-select
                    v-else-if="item.type === 'select'"
                    v-model="item.value"
                    :placeholder="item.placeholder"
                    clearable
                >
                  <el-option v-for="op in item.option" :key="op.value" :label="op.label" :value="op.value"/>
                </el-select>
                <el-input v-else v-model="item.value" :placeholder="item.placeholder" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>

        <!-- 培训信息 -->
        <el-card class="section-card" header="培训信息">
          <el-row :gutter="20">
            <el-col v-for="item in infoItems" :span="8" :key="item.name">
              <el-form-item :label="item.label" :prop="item.name">
                <el-select
                    v-if="item.type === 'multiplySelect'"
                    v-model="item.value"
                    :placeholder="item.placeholder"
                    multiple
                    clearable
                >
                  <el-option v-for="op in item.option" :key="op.value" :label="op.label" :value="op.value"/>
                </el-select>
                <el-select
                    v-else-if="item.type === 'select'"
                    v-model="item.value"
                    :placeholder="item.placeholder"
                    clearable
                >
                  <el-option v-for="op in item.option" :key="op.value" :label="op.label" :value="op.value"/>
                </el-select>
                <el-input v-else v-model="item.value" :placeholder="item.placeholder" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>

        <!-- 预算信息 -->
        <el-card class="section-card" header="预算信息">
          <el-row :gutter="20">
            <el-col v-for="item in countItems" :span="8" :key="item.name">
              <el-form-item :label="item.label" :prop="item.name">
                <el-input v-if="item.type === 'counter'" :value="counter()" readonly/>
                <el-input v-else v-model="item.value" :placeholder="item.placeholder" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>

        <!-- 操作按钮 -->
        <el-form-item class="action-buttons">
          <el-button type="primary" @click="submitForm">暂存</el-button>
          <el-button type="success" @click="submitForm">提交</el-button>
          <el-button type="info" @click="router.push('index')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.page-container {
  padding: 20px;
  background-color: #f5f7fa;
}

.form-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.section-card {
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.action-buttons {
  text-align: center;
  margin-top: 20px;
}
</style>