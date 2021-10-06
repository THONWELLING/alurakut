import {SiteClient} from 'datocms-client'

export default async function requestTaker(request, response){
  if(request.method === 'POST') {
    const TOKEN = 'ce9e5173e00950104fbe7acd9e718d'

    const client = new SiteClient(TOKEN)

    const createRecord = await client.items.create({

      //O ID do model de "communities" é criado pelo Dato por isso não está na lista abaixo

      itemType: '1241496',
      ...request.body,
      // tittle:  'vou ser Fullstack',
      // imageUrl:   'https://cursos-ead.com/wp-content/uploads/2019/08/Desenvolvedor-Full-Stack.png',
      // creatorSlug: 'Thonwelling',
    })

    response.json({
      data: 'someExempleData',
      createRecord: createRecord,
    })
    return;

    response.status(404).json({
    message: 'We have nothing in "GET" yet, but it has in "POST"!'
  })
  }
}