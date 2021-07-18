import { Main } from 'next/document'
import styled from 'styled-components'

import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/alurakutCommons';
import { ProfilerRelationsBoxWrapper } from '../src/components/ProfileRelations';



function ProfileSidebar(props) {
  return (
  <Box >
    <img src={`https://github.com/${props.githubUser}.png`}  style={{borderRadius: '8px'}} />
</Box>
  )
}


export default function Home() {
  const githubUser = 'THONWELLING';
  const pessoasFavoritas = [
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
        kkkkkkkkkkkk
        <div className="profileArea" style={{ gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea'}}>
          <Box >
            <h1 className="title">
              Bem Vindo(a)
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
          <ProfilerRelationsBoxWrapper >
            <h2 className="smallTitle">
              Pessoas de Comunidade({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) =>{
                return(
                  <li>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })};
            </ul>
          </ProfilerRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
