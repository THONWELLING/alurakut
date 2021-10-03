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
        <a className="boxLink" href={`https://github.com/${props.githubUser}.`}>
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
  const [communities, setComunities] = React.useState([{
    id:'123456',
    title:'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);

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
            <form onSubmit={function handleMakeComunity(e){
                const formData = new FormData(e.target);

                const community ={
                  id:new Date().toISOString(),
                  title:formData.get('title'),
                  image:formData.get('image')
                }
                const updatedCommunities = [...communities, community]
                
                setCommunities(updatedCommunities);
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
                  aria-label="Coloque uma url para usarmos de capa?"
                />
              </div>
              <button>
                Criar Comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper >
            <h2 className="smallTitle">
              Comunidades({communities.length})
            </h2>
            <ul>
              {communities.map((itemAtual) =>{
                return(
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
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
