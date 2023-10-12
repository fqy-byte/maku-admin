import service from '@/utils/request'

export const useGrid_responsible_personApi = (id: number) => {
	return service.get('/grid/grid_responsible_person/' + id)
}

export const useGrid_responsible_personSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/grid/grid_responsible_person', dataForm)
	} else {
		return service.post('/grid/grid_responsible_person', dataForm)
	}
}