import styled from 'styled-components'


const Box = styled.div`
background: rgba(0, 160, 254, 0.23);
border: 1px solid rgba(0, 160, 254, 0.35);
border-radius: 8px;
padding: 16px;
margin-bottom: 10px;


  
  /* CSS Pré-Pronto */
.boxLink {
    font-size: 14px;
    color: rgba(14, 18, 14, 0.78);
    text-decoration: none;
    font-weight: 800;
}
.title {
    font-size: 32px;
    font-weight: 500;
    margin-bottom: 20px;
    text-shadow: 3px -3px 3px lightblue;
    color: #fff;
}
.subTitle {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
}
.smallTitle {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 500;
    color: #fff;
    text-shadow: 3px -2px 2px #000;
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
    border: 1px solid rgba(0, 160, 254, 0.38);
    color: rgba(14, 18, 14, 0.78);
    font-size: 14px;
    border: 0;
    padding: 14px 16px;
    margin-bottom: 14px;
    border-radius: 8px;
    ::placeholder {
    color: rgba(285, 285, 285, 0.9);
    text-transform: capitalize;
    text-shadow: 3px -2px 2px  #000;
    }
}
button {
    border: 0;
    padding: 8px 12px;
    color: rgba(10, 18, 9, 0.9);
    border-radius: 8px;
    background-color: #fff;
    font-size:14px;
    font-weight: bolder;
}
`; 

export default Box;