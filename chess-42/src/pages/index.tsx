import React, { useState, useRef} from "react";
import styles from'../styles/login.module.css'
import { useRouter } from "next/router";
import ChessWebAPI from 'chess-web-api';
import Form from 'react-bootstrap/Form';
import axios from "axios";
const Login : React.FC = () => {
    const chessAPI = new ChessWebAPI();

    const router = useRouter();
    const [username, setUsername] = useState('');
    const [User, setUser]= useState('')

    const handleSubmit = (e : any) => {
        e.preventDefault();
        console.log(`Logging in with username: ${username}`);
    };
    function sendDataToDB(data) {
        axios.post('https://chess-828a9-default-rtdb.firebaseio.com/.json', data)
            .then(response => {
                router.push({
                    pathname: "/[id]",
                    query: {
                        id : data.username
                    }
                })
            })
            .catch(error => {
                console.error(error);
            });
    }
    const handleLogin = () => {
        async function getLastGame() {
            try {
                const response = await chessAPI.getPlayer(username);
                setUser(response.body);

                sendDataToDB(User);
                console.log(response.body)

            } catch (error) {
                console.error(error);
                setUser("error");
            }
        }

        getLastGame();
    }

    return(
        <div className={styles.container}>
            <Form onSubmit={handleSubmit} className={styles.card}>
                <Form.Group>
                    <Form.Label>You chess.com Username</Form.Label>
                    <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                {
                    User === 'error'? <Form.Text className={styles.error}>Nome Nao encontrado</Form.Text> : <></>
                }
                <button type="submit" onClick={handleLogin} className={styles.btn}>Login</button>

                <a href="https://www.chess.com/register" className={styles.ref} >Sign up on chess.com</a>
            </Form>
        </div>
    );

};

export default Login
