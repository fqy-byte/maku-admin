import service from '@/utils/request'

export const useInspection_institutionApi = (id: number) => {
	return service.get('/youyang/inspection_institution/' + id)
}

export const useInspection_institutionSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/youyang/inspection_institution', dataForm)
	} else {
		return service.post('/youyang/inspection_institution', dataForm)
	}
}