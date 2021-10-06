import React from 'react'

import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/alurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';




function ProfileSidebar(props) {
  return (
    <Box as="aside" >
      <img src={`https://github.com/${props.githubUser}.png`}  style={{borderRadius: '12px'}} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr /> 
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}


export default function Home() {
  const githubUser = 'THONWELLING';
  const [communities, setCommunities] = React.useState([]);

 // const comunities = ['Alurakut'];

  const favoritePeople = [
    'juunegreiros',
    'omariosouto', 
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
    'gabrielfbarros',
    'SpruceGabriela',
    'Rafaelfaustini'
  ]

  //1-pegar o  array de dados do github

  const [followers, setFollowers] = React.useState([])
  React.useEffect(function() {
    fetch('https://api.github.com/users/peas/followers')
    .then(function(serverAnswer) {
      return serverAnswer.json()
    })
    .then(function(fullResponse) {
      setFollowers(fullResponse);
    })

    // API GraphQl

    fetch('https://graphql.datocms.com/',
    {
      method: 'POST',
      headers:{
        'Authorization': 'ae6b44fc6dad7fc46c5a69eb2e1e75',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({"query": `query {
          allCommunities {
            tittle
            id
            imageUrl
            creatorSlug
          }
      }` })
    }).then((response) => response.json())//pega a retorno do response.jason() e retorna ele direto
      .then((fullResponse) => {
        const communitiesComeDato = fullResponse.data.allCommunities
        
        setCommunities(communitiesComeDato)
      })
  }, []);

  //2-criar um box que vai ter um map, nos itens  do array que pegamos do github

  function ProfileRelationsBox(props) {
    return(
      <ProfileRelationsBoxWrapper >
        <h2 className="smallTitle">
          {props.tittle}({props.items.length})
        </h2>
        <ul>
          {followers.map((itemAtual) =>{
            return(
              <li key={itemAtual}>
                <a href={`https://github.com/${itemAtual}.png`}>
                  <img src={itemAtual.image} />
                  <span>{itemAtual.title}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </ProfileRelationsBoxWrapper>   
    )
  }
  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea'}}>

          <Box >
            <h1 className="title">
              Bem Vindo(a) ThonWelling
            </h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleMakeCommunity(e){
              e.preventDefault()
                const formData = new FormData(e.target);

                const community ={
                  title: formData.get('title'),
                  imageUrl: formData.get('image'),
                  creatorSlug: githubUser,
                }

                fetch('/api/communities', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(community)
                })
                .then(async (response) => {
                  const data = await response.json()
                  console.log(data.createRecord)
                  const community = data.createRecord
                  const updatedCommunities = [...communities, community]                
                  setCommunities(updatedCommunities);
                })
            }}>
              <div>
                <input 
                  type="text"
                  name="title" 
                  placeholder="Qual vai ser o nome da comunidade?" 
                  aria-label="Qual vai ser o nome da comunidade?"
                />
              </div>
              <div>
                <input 
                  placeholder="Coloque uma url para usarmos de capa" 
                  name="image" 
                  aria-label="Coloque uma url para usarmos de capa!"
                />
              </div>
              <button>
                Criar Comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBox  tittle="Seguidores" items={followers} />
          <ProfileRelationsBoxWrapper >
            <h2 className="smallTitle">
              Comunidades({communities.length})
            </h2>
            <ul>
              {communities.map((itemAtual) =>{
                return(
                  <li key={itemAtual.id}>
                    <a href={`/communities/${itemAtual.id}`}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.tittle}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper >
            <h2 className="smallTitle">
              Devs Inspiração({favoritePeople.length})
            </h2>
            <ul>
              {favoritePeople.map((itemAtual) =>{
                return(
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
