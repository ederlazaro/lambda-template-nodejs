import Db from '../common/db'

const db = new Db()

export class SalesDirectoryRepository {
  async getListBcmByCountry(country) {
    const pool = await db.connect()
    const queryStatement = `SELECT CodCliente, Nombres, usuarioRed FROM [FFVV].[Directorio_Venta_Usuario] WHERE ESTADO = 'ACTIVA' AND codRol = 'BC' AND codPais like '${country}%'`
    // console.log('getListBcmByCountry.queryStatement', queryStatement)
    const result = await pool.request().query(queryStatement)
    return result.recordset
  }
}
