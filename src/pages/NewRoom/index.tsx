import React from 'react';
import illustration from '../../assets/illustration.svg'
import {Link} from 'react-router-dom';
import logo from '../../assets/logo.svg'
import {Aside, Container, Form, Main, Content} from './styles'
import {Button} from "../../components";

function NewRoom() {


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
                    <h2>Crie uma nova sala</h2>
                    <Form>
                        <input type='text' placeholder='Nome da sala'/>
                        <Button type='submit'>Criar sala</Button>
                    </Form>
                    <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link></p>
                </Content>
            </Main>
        </Container>
    );
}

export default NewRoom;
