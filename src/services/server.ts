import { Server, Response } from 'miragejs'
import mockResponse from './mock'

export function makeServer({ environment = 'development' } = {}) {
  const db = [mockResponse]
  const server = new Server({
    environment,

    routes() {

      this.namespace = 'api'

      this.get('/form-builder', schema => {
        return new Response(200, {}, mockResponse)
      })

      this.get('/form', (schema, request) => {
        if(request.queryParams.uuid === mockResponse.checklist.form.uuid)
          return new Response(200, {}, mockResponse)
        else return new Response(404, {}, {message:'Not Found'})
      })

      this.post('/form', (schema, request) => {
        const checklist = JSON.parse(request.requestBody)
        db.push(checklist)
        return new Response(
          200,
          {},
          { success:true, message: `Successfully added to ${mockResponse.checklist.checklist_title} checklist`}
        )
      }, { timing: 3000 })
    },
  })

  return server
}