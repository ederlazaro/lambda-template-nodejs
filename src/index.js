const Yenv = require('yenv')
const { Service } = require('./services/service')

const env = new Yenv()
const service = new Service()

exports.handler = async (event, context) => {
  console.log('handler event --> ', JSON.stringify(event))
  console.log('handler context --> ', JSON.stringify(context))

  let response = null

  if (env.ACTIVE !== 1)
    response = { statusCode: 200, body: 'Servicio inactivo' }
  else
    try {
      const country = event.country

      const list = await service.getListConsultantsByCountry(country)
      console.log('getListConsultantsByCountry', list)

      // TODO: Invocar metodo que genere archivo CSV

      // TODO: Invocar metodo que envie por correo

      response = { statusCode: 200, body: 'Ok' }
    } catch (error) {
      console.error('error', error)

      response = { statusCode: 400, body: error }
    }

  return response
}
