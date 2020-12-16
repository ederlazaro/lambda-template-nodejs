import { SalesDirectoryRepository } from '../repositories'

const salesDirectoryRepository = new SalesDirectoryRepository()

export class Service {
  async getListConsultantsByCountry(country) {
    const listBcm = await salesDirectoryRepository.getListBcmByCountry(country)

    const listConsultant = []

    if (listBcm)
      listBcm.forEach(bcm => {
        // TODO: Consumir servicio de API sales_force para jalar las consultoras por BCM
        listConsultant.push({
          consultant_code: 'ABC',
          bcm_code: bcm.CodCliente,
          bcm_name: bcm.Nombres,
          bcm_username: bcm.usuarioRed,
        })
      })

    return listConsultant
  }
}
