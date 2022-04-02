import { Server, Response } from 'miragejs'
import mockResponse from './mock'

export function makeServer({ environment = 'development' } = {}) {
  const db = [mockResponse]
  const server = new Server({
    environment,

    routes() {

      this.namespace = 'api'

      this.get('/form', schema => {
        return new Response(200, {}, mockResponse)
      })

      this.post('/form', (schema, request) => {
        const headers = {}
        const checklist = JSON.parse(request.requestBody)
        db.push(checklist)
        return new Response(
          200,
          headers,
          { success:true, message: `Successfully added to ${mockResponse.checklist.checklist_title} checklist`}
        )
      }, { timing: 3000 })
    },
  })

  return server
}