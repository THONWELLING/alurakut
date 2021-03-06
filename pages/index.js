import React, { useEffect, useState } from 'react'

import nookies from 'nookies'
import jwt from 'jsonwebtoken'

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

 

export default function Home(props) {
  const githubUser = props.githubUser
  const [communities, setCommunities] = useState([ ]);

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

  const [followers, setFollowers] = useState([])

  useEffect(() => {
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
        'Authorization' : 'ae6b44fc6dad7fc46c5a69eb2e1e75',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({"query" : `query {
          allCommunities {
          tittle
          id
          imageUrl
          creatorSlug
        }
      }` })
    }).then((response) => response.json())       //pega a retorno do response.jason() e retorna ele direto
      .then((fullResponse) => {
        const communitiesComesDato = fullResponse.data.allCommunities
        console.log(communitiesComesDato)               //analizando resposta do datocms    
        setCommunities(communitiesComesDato)
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
          {followers.map((itemAtual) => {
            return(
              <li key={itemAtual.id}>
                <a href={`https://github.com/${itemAtual}.png`}>
                  <img src={itemAtual.avatar_url} />
                  <span>{itemAtual.login}</span>
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
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea'}}>

          <Box >
            <h1 className="title"  style={{color:'rgba(15, 15, 15, 0.59)'}}>
              Bem Vindo(a) {githubUser}
            </h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que voc?? deseja fazer?</h2>
            <form onSubmit={function handleCreateCommunity(e){
              e.preventDefault()
              const formData = new FormData(e.target);

              const community ={
                tittle: formData.get('tittle'),
                imageUrl: formData.get('image'),
                CreatorSlug: githubUser,
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
                  placeholder="nome da comunidade?" 
                  aria-label="nome da comunidade?"
                />
              </div>
              <div>
                <input 
                  placeholder="url para usarmos de capa" 
                  name="image" 
                  aria-label="url para usarmos de capa!"
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
              Devs Inspira????o({favoritePeople.length})
            </h2>
            <ul>
              {favoritePeople.map((itemAtual) =>{
                return(
                  <li key={itemAtual}>
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


export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN
  console.log('Token decodificado', )

  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers:{
      Authorization: token
    }
  }).then((response) => response.json())

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  const {githubUser} = jwt.decode(token)

  return {
    props: {
      githubUser
    },
  }
}
