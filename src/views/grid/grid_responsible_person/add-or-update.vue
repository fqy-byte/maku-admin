<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false">
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="100px" @keyup.enter="submitHandle()">
	    				<el-form-item label="自增主键ID" prop="id">
					<el-input v-model="dataForm.id" placeholder="自增主键ID"></el-input>
				</el-form-item>
				<el-form-item label="责任人姓名" prop="name">
					<el-input v-model="dataForm.name" placeholder="责任人姓名"></el-input>
				</el-form-item>
				<el-form-item label="联系方式" prop="contact">
					<el-input v-model="dataForm.contact" placeholder="联系方式"></el-input>
				</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible = false">取消</el-button>
			<el-button type="primary" @click="submitHandle()">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus/es'
import { useGrid_responsible_personApi, useGrid_responsible_personSubmitApi } from '@/api/grid/grid_responsible_person'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	name: '',
	contact: '',
	creator: '',
	createTime: '',
	updater: '',
	updateTime: '',
	version: '',
	deleted: ''})

const init = (id?: number) => {
	visible.value = true
	dataForm.id = ''

	// 重置表单数据
	if (dataFormRef.value) {
		dataFormRef.value.resetFields()
	}

	if (id) {
		getGrid_responsible_person(id)
	}
}

const getGrid_responsible_person = (id: number) => {
	useGrid_responsible_personApi(id).then(res => {
		Object.assign(dataForm, res.data)
	})
}

const dataRules = ref({
	name: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	contact: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}

		useGrid_responsible_personSubmitApi(dataForm).then(() => {
			ElMessage.success({
				message: '操作成功',
				duration: 500,
				onClose: () => {
					visible.value = false
					emit('refreshDataList')
				}
			})
		})
	})
}

defineExpose({
	init
})
</script>
