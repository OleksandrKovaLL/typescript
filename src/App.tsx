import './App.css';
import React, { useState, useEffect } from 'react';
import Cart, { CardVariant } from './components/Cart';
import UserList from './components/UserList';
import { ITodo, IUser } from './types/types';
import axios from 'axios';
import List from './components/List';
import UserItem from './components/UserItem';
import TodoItem from './components/TodoItem';

function App() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [todos, setTodos] = useState<ITodo[]>([]);

    useEffect(() => {
        fetchUsers();
        fetchTodos();
    }, []);

    async function fetchUsers() {
        try {
            const response = await axios.get<IUser[]>(
                'https://jsonplaceholder.typicode.com/users'
            );
            setUsers(response.data);
        } catch (e) {
            alert(e);
        }
    }

    async function fetchTodos() {
        try {
            const response = await axios.get<ITodo[]>(
                'https://jsonplaceholder.typicode.com/todos?_limit=10'
            );
            setTodos(response.data);
        } catch (e) {
            alert(e);
        }
    }

    return (
        <div>
            <Cart
                onClick={(num) => console.log('click')}
                variant={CardVariant.primary}
                width='200px'
                height='200px'
            ></Cart>
            <List
                items={users}
                renderItem={(user: IUser) => (
                    <UserItem user={user} key={user.id} />
                )}
            />
            <List
                items={todos}
                renderItem={(todo: ITodo) => (
                    <TodoItem todo={todo} key={todo.id} />
                )}
            />
        </div>
    );
}

export default App;
