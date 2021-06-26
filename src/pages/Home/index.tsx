import React, {FormEvent, useState} from 'react';
import {useHistory} from 'react-router-dom'
import illustration from '../../assets/illustration.svg'
import logo from '../../assets/logo.svg'
import googleIConImg from '../../assets/google-icon.svg'
import {Aside, Container, Form, Main, Content, Separator,  ButtonGoogle} from './styles'
import {Button} from "../../components";
import {useAuth} from "../../hooks/useAuth";
import {database} from "../../services/firebase";

function Home() {
  const [roomCode, setRoomCode] =useState("")
  const history = useHistory();
  const { signInWithGoogle, user } = useAuth();

  async function handleCreateRoom(){
    if(!user){
      await signInWithGoogle()
    }
    history.push('/rooms/new')
  }

  async function handleJoinRoom(event: FormEvent){
    event.preventDefault()

    if(roomCode.trim() === ''){
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if(!roomRef.exists()){
      alert('Room does not exists.')
      return
    }

    if(roomRef.val().endedAt){
      alert('Room already closed')
      return
    }

    history.push(`/rooms/${roomCode}`)
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
            Crie sua sala com Google
          </ButtonGoogle>
          <Separator>ou entre em uma sala</Separator>
          <Form onSubmit={handleJoinRoom}>
            <input
              type='text'
              placeholder='DIgite o código da sala'
              onChange={(event)=> setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button  type='submit'>Entrar na sala</Button>
          </Form>
        </Content>
      </Main>
    </Container>
  );
}

export default Home;
