import styled from 'styled-components'


const Box = styled.div`
background: rgba(0, 160, 254, 0.23);
border: 1px solid rgba(0, 160, 254, 0.35);
border-radius: 8px;
padding: 16px;

  /* CSS Pré-Pronto */
  
margin-bottom: 10px;
.boxLink {
    font-size: 14px;
    color: rgba(14, 18, 14, 0.78);
    text-decoration: none;
    font-weight: 800;
}
.title {
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 20px;
}
.subTitle {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
}
.smallTitle {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    color: rgba(14, 18, 14, 0.78);
    margin-bottom: 20px;
}
hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #ECF2FA;
}
input {
    width: 100%;
    background: rgba(0, 160, 254, 0.23);
    border: 1px solid rgba(0, 160, 254, 0.35);
    color: rgba(14, 18, 14, 0.78);
    border: 0;
    padding: 14px 16px;
    margin-bottom: 14px;
    border-radius: 8px;
    ::placeholder {
    color: rgba(14, 18, 14, 0.78);
    opacity: 1;
    }
}
button {
    border: 0;
    padding: 8px 12px;
    color: rgba(14, 18, 14, 0.78);
    border-radius: 8px;
    background-color: #6F92BB;
}
`; 

export default Box;