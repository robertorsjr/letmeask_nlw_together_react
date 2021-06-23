import React, {FormEvent, useState} from 'react';
import illustration from '../../assets/illustration.svg'
import {Link, useHistory} from 'react-router-dom';
import logo from '../../assets/logo.svg'
import {Aside, Container, Form, Main, Content} from './styles'
import {Button} from "../../components";
import {database} from "../../services/firebase";
import {useAuth} from "../../hooks/useAuth";


function NewRoom() {
    const [newRoom, setNewRoom]= useState('')
    const { user } = useAuth()
    const history = useHistory()

    async function handleCreateRoom(event: FormEvent){
       event.preventDefault()
        if(newRoom.trim() === ''){
            return ;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push(({
            title: newRoom,
            authorId: user?.id,
        }))

        history.push(`/rooms/${firebaseRoom.key}`)
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
                    <h2>Crie uma nova sala</h2>
                    <Form onSubmit={handleCreateRoom}>
                        <input
                            type='text'
                            placeholder='Nome da sala'
                            onChange={(event) => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type='submit'>Criar sala</Button>
                    </Form>
                    <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link></p>
                </Content>
            </Main>
        </Container>
    );
}

export default NewRoom;
