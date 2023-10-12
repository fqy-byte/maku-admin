import service from '@/utils/request'

export const useGridApi = (id: number) => {
	return service.get('/grid/grid/' + id)
}

export const useGridSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/grid/grid', dataForm)
	} else {
		return service.post('/grid/grid', dataForm)
	}
}