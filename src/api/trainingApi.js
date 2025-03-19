import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:3000/api', // 后端 API 地址
	timeout: 5000, // 请求超时时间
});

// 获取所有培训计划
export const getTrainingPlans = async () => {
	try {
		const response = await api.get('/plans');
		return response.data;
	} catch (error) {
		console.error('获取培训计划失败:', error);
		throw error;
	}
};

// 添加培训计划
export const addTrainingPlan = async (data) => {
	try {
		const response = await api.post('/plans', data);
		return response.data;
	} catch (error) {
		console.error('添加培训计划失败:', error);
		throw error;
	}
};

// 删除培训计划
export const deleteTrainingPlan = async (id) => {
	try {
		const response = await api.delete(`/plans/${id}`);
		return response.data;
	} catch (error) {
		console.error('删除培训计划失败:', error);
		throw error;
	}
};

// 更新培训计划
export const updateTrainingPlan = async (id, data) => {
	try {
		const response = await api.put(`/plans/${id}`, data);
		return response.data;
	} catch (error) {
		console.error('更新培训计划失败:', error);
		throw error;
	}
};