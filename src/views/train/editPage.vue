<script lang="ts" setup>
import {onMounted, ref, watch} from "vue";
import router from "@/router/index.js";
import {useRoute} from "vue-router";
import {dayjs, ElMessage, ElMessageBox} from "element-plus";
import FileUpload from "@/components/FileUpload.vue";

// 获取路由信息
const route = useRoute();
const isEditMode = ref(false); // 是否是编辑模式
const formData = ref({code: ''}); // 所有表单数据,通过读取浏览器获得
const dataArr = ref([]); // 存储一条信息所有数据的数组,通过router传参获得
const index = ref(-1); // 当前编辑数据的索引
// 获取上传的文件列表
const fileUploadRef = ref();
const uploadedFiles = ref<{ name: string; url: string }[]>([]);
// 计划信息
const planItems = ref([
  {name: "code", label: "项目编号", placeholder: "请输入项目编号", value: "", type: "input"},
  {name: "item", label: "项目培训", placeholder: "请输入培训项目", value: "", type: "input"},
  {
    name: "plan_sort",
    label: "计划类别",
    placeholder: "请选择计划类别",
    value: "",
    type: "select",
    option: [
      {label: "年度计划", value: "年度计划"},
      {label: "季度计划", value: "季度计划"},
      {label: "月度计划", value: "月度计划"},
      {label: "周计划", value: "周计划"},
    ],
  },
  {
    name: "train_time",
    label: "培训时间",
    placeholder: "请选择培训时间",
    value: [],
    type: "multiplySelect",
    option: [
      {label: "一季度", value: "一季度"},
      {label: "二季度", value: "二季度"},
      {label: "三季度", value: "三季度"},
      {label: "四季度", value: "四季度"},
    ],
  },
  {
    name: 'org_code',
    label: '组织部门/编码',
    placeholder: '请选择组织部门/编码',
    value: '',
    type: 'tree',
    dataOption: [
      {
        value: '双流机场指挥部',
        label: '双流机场指挥部',
        children: [
          {
            value: '航站楼管理部',
            label: '航站楼管理部',
            children: [
              {
                value: '研发部门',
                label: '研发部门',
              },
              {
                value: '市场部门',
                label: '市场部门',
              },
              {
                value: '测试部门',
                label: '测试部门',
              },
              {
                value: '财务部门',
                label: '财务部门',
              },
              {
                value: '运维部门',
                label: '运维部门',
              },
            ],
          },
          {
            value: '地勤管理部门',
            label: '地勤管理部门',
            children: [
              {
                value: '地质检查部门',
                label: '地质检查部门',
              },
              {
                value: '地质采集部门',
                label: '地质采集部门',
              },
            ],
          },
          {
            value: '三维演练部门',
            label: '三维演练部门',
            children: [
              {
                value: '三维空间部门',
                label: '三维空间部门',
              },
              {
                value: '二维空间部门',
                label: '二维空间部门',
              },
            ],
          }
        ],
      },
    ]
  },
  {
    name: 'implement',
    label: '实施部门/编码',
    placeholder: '请选择实施部门/编码',
    value: '',
    type: 'tree',
    dataOption: [
      {
        value: '双流机场指挥部',
        label: '双流机场指挥部',
        children: [
          {
            value: '航站楼管理部',
            label: '航站楼管理部',
            children: [
              {
                value: '研发部门',
                label: '研发部门',
              },
              {
                value: '市场部门',
                label: '市场部门',
              },
              {
                value: '测试部门',
                label: '测试部门',
              },
              {
                value: '财务部门',
                label: '财务部门',
              },
              {
                value: '运维部门',
                label: '运维部门',
              },
            ],
          },
          {
            value: '地勤管理部门',
            label: '地勤管理部门',
            children: [
              {
                value: '地质检查部门',
                label: '地质检查部门',
              },
              {
                value: '地质采集部门',
                label: '地质采集部门',
              },
            ],
          },
          {
            value: '三维演练部门',
            label: '三维演练部门',
            children: [
              {
                value: '三维空间部门',
                label: '三维空间部门',
              },
              {
                value: '二维空间部门',
                label: '二维空间部门',
              },
            ],
          }
        ],
      },
    ]
  },
  {name: "train_op", label: "培训对象", placeholder: "请输入培训对象", value: "", type: "input"},
  {name: "participants", label: "计划参训人数(人)", placeholder: "请输入计划参训人数(人)", value: "", type: "input"},
  {name: "trainingLocation", label: "培训地点", placeholder: "请输入培训地点", value: "", type: "input"},
]);
// 培训信息
const infoItems = ref([
  {
    name: "train_way",
    label: "培训方式",
    placeholder: "请输入培训方式",
    value: "",
    type: "select",
    option: [
      {label: "内培", value: "内培"},
      {label: "外培", value: "外培"},
      {label: "统培", value: "统培"},
    ],
  },
  {
    name: "train_sort",
    label: "培训分类",
    placeholder: "请输入培训分类",
    value: "",
    type: "select",
    option: [
      {label: "软件培训", value: "软件培训"},
      {label: "游戏培训", value: "游戏培训"},
      {label: "资格证书", value: "资格证书"},
    ],
  },
  {name: "trainingHours", label: "培训课时(小时)", placeholder: "请输入培训课时(小时)", value: "", type: "input"},
  {
    name: "trainingTeacher",
    label: "培训师资",
    placeholder: "请输入培训师资",
    value: "",
    type: "select",
    option: [
      {label: "内部", value: "内部"},
      {label: "外部", value: "外部"},
      {label: "总部", value: "总部"},
    ],
  },
  {
    name: "trainingDirection",
    label: "培训方向",
    placeholder: "请输入培训方向",
    value: "",
    type: "select",
    option: [
      {label: "Java方向", value: "Java方向"},
      {label: "前端方向", value: "前端方向"},
      {label: "运维方向", value: "运维方向"},
      {label: "党工团建设", value: "党工团建设"},
    ],
  },
  {
    name: "trainingType",
    label: "培训类别",
    placeholder: "请输入培训类别",
    value: "",
    type: "select",
    option: [
      {label: "应急救援", value: "应急救援"},
      {label: "销售口才", value: "销售口才"},
      {label: "编程开发", value: "编程开发"},
    ],
  },
  {name: "remark", label: "备注", placeholder: "请输入备注", value: "", type: "textarea"},
]);
// 预算信息
const countItems = ref([
  {name: "travelCost", label: "差旅费(元)", placeholder: "请输入差旅费", value: "", type: "input"},
  {name: "trainingCost", label: "培训费(元)", placeholder: "请输入培训费", value: "", type: "input"},
  {name: "totalBudget", label: "总预算(元)", placeholder: "", value: "", type: "counter"},
]);
// 页面加载时初始化数据
onMounted(() => {
  const savedData = localStorage.getItem("trainingData");
  if (savedData) {
    dataArr.value = JSON.parse(savedData);
    if (isEditMode.value) {
      // 如果是编辑模式，找到对应的数据并填充表单
      index.value = dataArr.value.findIndex(
          (item) => item.code === formData.value.code
      );
      if (index.value !== -1) {
        const currentData = dataArr.value[index.value]; // 将 currentData 定义在这里
        [...planItems.value, ...infoItems.value, ...countItems.value].forEach(
            (item) => {
              item.value = currentData[item.name];
            }
        );
        // 初始化文件列表
        fileUploadRef.value.fileList = currentData.files || [];
      }
    }
  }
});
// 监听文件列表的变化
onMounted(() => {
  uploadedFiles.value = fileUploadRef.value.fileList;
});

//获取选中的数据,并判断是新增/修改页面
watch(
    () => route.params.dataArr,
    (newValue) => {
      if (typeof newValue === 'string') {
        formData.value = JSON.parse(newValue);
        isEditMode.value = true; // 进入编辑模式
      }
    },
    {immediate: true}
);

// 提交表单
function submitForm() {
  const form = {};
  [...planItems.value, ...infoItems.value, ...countItems.value].forEach((item) => {
    form[item.name] = item.value;
  });
  // 计算总预算并保存
  form["totalBudget"] = counter();
  form["createTime"] = '';
  form["reviewTime"] = '';
  form["isPassReview"] = 'false';
  // 保存文件列表
  form["files"] = fileUploadRef.value.fileList; // 将文件列表存入当前数据
  // 检查 code 的唯一性（仅新增模式）
  if (!isEditMode.value) {
    const isCodeUnique = dataArr.value.every((obj) => obj.code !== form["code"]);
    if (!isCodeUnique) {
      ElMessage.warning("项目编号已存在");
      return; // 停止提交
    }
  }
  ElMessageBox.confirm("是否保存数据？", "提示", {
    type: "info",
    confirmButtonText: "确认",
    cancelButtonText: "取消",
  })
      .then(() => {
        if (isEditMode.value) {
          // 编辑模式：更新数据
          dataArr.value[index.value] = form;
          ElMessage.success("数据更新成功");
        } else {
          // 新增模式：添加数据
          form["createTime"] = dayjs().format("YYYY-MM-DD HH:mm:ss");
          dataArr.value.push(form);
          ElMessage.success("数据添加成功");
        }
        localStorage.setItem("trainingData", JSON.stringify(dataArr.value));
        router.push({name: "index"});
      })
      .catch(() => {
        ElMessage.warning("取消保存");
      });
}

// 计算总预算
function counter() {
  let sum = 0;
  countItems.value.forEach((obj) => {
    sum += parseFloat(obj.value) || 0;
  });
  return sum;
}

// 返回首页
function goto() {
  router.push({name: "index"});
}


</script>

<template>
  <div class="page-container">
    <el-card class="form-card">
      <el-form label-width="120px">
        <!-- 计划信息 -->
        <el-card class="section-card" header="计划信息">
          <el-row :gutter="20">
            <el-col v-for="item in planItems" :key="item.name" :span="8">
              <el-form-item :label="item.label">
                <el-select
                    v-if="item.type === 'multiplySelect'"
                    v-model="item.value"
                    :placeholder="item.placeholder"
                    clearable
                    multiple
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
                <el-tree-select v-else-if="item.type==='tree'"
                                v-model="item.value"
                                :data="item.dataOption"
                                :placeholder="item.placeholder"
                                :render-after-expand="false"/>
                <el-input v-else v-model="item.value" :placeholder="item.placeholder" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>

        <!-- 培训信息 -->
        <el-card class="section-card" header="培训信息">
          <el-row :gutter="20">
            <el-col v-for="item in infoItems" :key="item.name" :span="8">
              <el-form-item :label="item.label">
                <el-select
                    v-if="item.type === 'multiplySelect'"
                    v-model="item.value"
                    :placeholder="item.placeholder"
                    clearable
                    multiple
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
                <el-input v-else-if="item.type === 'textarea'" v-model="item.value" clearable type="textarea"/>
                <el-input v-else v-model="item.value" :placeholder="item.placeholder" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <!-- 预算信息 -->
        <el-card class="section-card" header="预算信息">
          <el-row :gutter="20">
            <el-col v-for="item in countItems" :key="item.name" :span="8">
              <el-form-item :label="item.label">
                <el-input v-if="item.type === 'counter'" :value="counter()" readonly/>
                <el-input v-else v-model="item.value" :placeholder="item.placeholder" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <!--培训材料-->
        <el-card class="section-card" header="预算信息">
          <FileUpload ref="fileUploadRef"/>
          <div style="margin-top: 20px;">
            <h5>上传的文件列表：</h5>
            <ul>
              <li v-for="file in uploadedFiles" :key="file.name">{{ file.name }}</li>
            </ul>
          </div>
        </el-card>
        <!-- 操作按钮 -->
        <div class="action-buttons">
          <el-button type="primary" @click="submitForm">{{ isEditMode ? "更新" : "提交" }}</el-button>
          <el-button type="info" @click="goto">返回</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<style>
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