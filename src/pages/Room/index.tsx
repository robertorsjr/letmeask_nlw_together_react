import React, {FormEvent, useEffect, useState} from 'react';
import logoImg from '../../assets/logo.svg'
import { useRouteMatch} from 'react-router-dom'
import {Button, RoomCode} from "../../components";
import {Content, Container, Header, UserInfo, Main, RoomTitle, Form, FormFooter} from './styles'
import {useAuth} from "../../hooks/useAuth";
import {database} from "../../services/firebase";

type RoomParams = {
    id: string;
}

type FirebaseQuestions = Record<string, {
    author: {
        name:string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
}>

type Question = {
    id: string;
    author: {
        name:string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}

function Room() {
    const [newQuestion, setNewQuestion]= useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [title, setTitle] = useState('');
    const { params } = useRouteMatch<RoomParams>()
    const {user} = useAuth()

    useEffect(() => {
      const roomRef = database.ref(`/rooms/${params.id}`)
      roomRef.on('value', room =>{
          const databaseRoom = room.val()
          const firebaseQuestions: FirebaseQuestions = databaseRoom.questions;

          const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) =>{
              return {
                  id: key,
                  content: value.content,
                  author: value.author,
                  isHighlighted: value.isHighLighted,
                  isAnswered: value.isAnswered,
              }
          })
          setTitle(databaseRoom.title)
          setQuestions(parsedQuestions)
      })
    }, [params.id]);



    async function handleSendQuestion(event: FormEvent){
        event.preventDefault()
        if(newQuestion.trim() === ''){
            return;
        }

        if(!user){
            throw new Error('You must be logged in')
        }

        const question = {
            content: newQuestion,
            author: {
                name: user?.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswered: false,
        }

        await database.ref(`/rooms/${params.id}/questions`).push(question)
        setNewQuestion('')
    }

    return (
        <Container>
            <Header>
                <Content>
                    <img src={logoImg} alt='letmeask'/>
                    <RoomCode code={params.id}/>
                </Content>
            </Header>
            <Main>
                <RoomTitle>
                    <h1>Sala {title}</h1>
                    {questions.length > 0 &&
                    <span>{questions.length} perguntas</span>
                    }
                </RoomTitle>
                <Form onSubmit={handleSendQuestion}>
                    <textarea
                        placeholder='O que você quer perguntar?'
                        onChange={(e)=> setNewQuestion(e.target.value)}
                        value={newQuestion}
                    />
                    <FormFooter>
                        { user ? (
                            <UserInfo>
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                />
                                <span>{user.name}</span>
                            </UserInfo>
                        ) : (
                            <span>Para enviar uma pergunta,
                                <button> faça seu login</button>
                            </span>
                        )}
                        <Button type='submit' disabled={!user}>Enviar pergunta</Button>
                    </FormFooter>
                </Form>
                {JSON.stringify(questions)}
            </Main>
        </Container>
    );
}

export default Room;
