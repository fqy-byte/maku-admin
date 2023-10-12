import service from '@/utils/request'

export const useInspection_institutionApi = (id: number) => {
	return service.get('/grid/inspection_institution/' + id)
}

export const useInspection_institutionSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/grid/inspection_institution', dataForm)
	} else {
		return service.post('/grid/inspection_institution', dataForm)
	}
}