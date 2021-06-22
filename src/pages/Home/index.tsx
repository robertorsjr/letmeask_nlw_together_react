import React from 'react';
import {useHistory} from 'react-router-dom'
import illustration from '../../assets/illustration.svg'
import logo from '../../assets/logo.svg'
import googleIConImg from '../../assets/google-icon.svg'
import {Aside, Container, Form, Main, Content, Separator,  ButtonGoogle} from './styles'
import {Button} from "../../components";
import {useAuth} from "../../hooks/useAuth";

function Home() {
    const history = useHistory();
    const { signInWithGoogle, user } = useAuth();

    async function handleCreateRoom(){
        if(!user){
            await signInWithGoogle()
        }
        history.push('/room/new')
    }

    return (
        <Container>
            <Aside>
                <img src={illustration} alt='Ilustração'/>
                <strong>Crie salas de Q&A ao-Vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real </p>
            </Aside>
            <Main>
                <Content>
                    <img src={logo} alt='let me ask'/>
                    <ButtonGoogle onClick={handleCreateRoom}>
                        <img src={googleIConImg} alt='logo google'/>
                        crie sua sala com Google
                    </ButtonGoogle>
                    <Separator>ou entre em uma sala</Separator>
                    <Form>
                        <input type='text' placeholder='DIgite o código da sala'/>
                        <Button  type='submit'>Entrar na sala</Button>
                    </Form>
                </Content>
            </Main>
        </Container>
    );
}

export default Home;
