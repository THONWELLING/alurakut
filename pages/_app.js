import { createGlobalStyle, ThemeProvider } from 'styled-components'
import {AlurakutStyles} from '../src/lib/alurakutCommons'



const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background: url(https://criticalhits.com.br/wp-content/uploads/2020/04/naruto-shippuden-kakashi-hatake-quiz.jpg) no-repeat center center fixed;
    background-size: cover;
    font-family: sans-serif;
  }
  #_next{
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
  img{
    max-width: 100%;
    height: auto;
    display: block;
  }
  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
