<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false">
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="100px" @keyup.enter="submitHandle()">
	    				<el-form-item label="自增主键ID" prop="id">
					<el-input v-model="dataForm.id" placeholder="自增主键ID"></el-input>
				</el-form-item>
				<el-form-item label="网格名称" prop="name">
					<el-input v-model="dataForm.name" placeholder="网格名称"></el-input>
				</el-form-item>
				<el-form-item label="纬度" prop="latitude">
					<el-input v-model="dataForm.latitude" placeholder="纬度"></el-input>
				</el-form-item>
				<el-form-item label="经度" prop="longitude">
					<el-input v-model="dataForm.longitude" placeholder="经度"></el-input>
				</el-form-item>
				<el-form-item label="检测机构ID" prop="institutionId">
					<el-input v-model="dataForm.institutionId" placeholder="检测机构ID"></el-input>
				</el-form-item>
				<el-form-item label="网格责任人ID" prop="responsiblePersonId">
					<el-input v-model="dataForm.responsiblePersonId" placeholder="网格责任人ID"></el-input>
				</el-form-item>
					<el-form-item label="检测机构名称" prop="institutionName">
						<el-select v-model="dataForm.institutionName" placeholder="请选择">
							<el-option label="请选择" value="0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="网格责任人姓名" prop="responsiblePersonName">
						<el-select v-model="dataForm.responsiblePersonName" placeholder="请选择">
							<el-option label="请选择" value="0"></el-option>
						</el-select>
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
import { useGridApi, useGridSubmitApi } from '@/api/grid/grid'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	name: '',
	latitude: '',
	longitude: '',
	institutionId: '',
	responsiblePersonId: '',
	institutionName: '',
	creator: '',
	createTime: '',
	responsiblePersonName: '',
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
		getGrid(id)
	}
}

const getGrid = (id: number) => {
	useGridApi(id).then(res => {
		Object.assign(dataForm, res.data)
	})
}

const dataRules = ref({
	name: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	latitude: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	longitude: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	institutionId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	responsiblePersonId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	institutionName: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	responsiblePersonName: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}

		useGridSubmitApi(dataForm).then(() => {
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
