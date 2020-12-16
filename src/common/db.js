import sql from 'mssql'
import Yenv from 'yenv'
import { COUNTRIES } from './constants'

const env = new Yenv()
const pools = {}

export default class {
  async connect(iso = 'PE') {
    const country = COUNTRIES[iso].NAME
    const config = {
      user: `${env.SERVER_DB.USER}`,
      password: `${env.SERVER_DB.PASSWORD}`,
      server: `${env.SERVER_DB.SERVER}`,
      port: env.SERVER_DB.PORT,
      database: `${env.SERVER_DB.DATABASE}`.replace('XX', country),
      encrypt: false,
      pool: {
        idleTimeoutMillis: 60 * 1000,
      },
      options: {
        enableArithAbort: true,
      },
    }

    // console.log('config db', JSON.stringify(config))

    if (!(country in pools)) {
      const pool = await new sql.ConnectionPool(config)

      const close = pool.close.bind(pool)

      pool.close = (...args) => {
        delete pools[country]
        return close(...args)
      }

      await pool.connect()

      pools[country] = pool
    }

    return pools[country]
  }

  closeAll() {
    return Promise.all(Object.values(pools).map(pool => pool.close()))
  }
}
