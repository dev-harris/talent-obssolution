import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { UserProvider } from './context/UserContext';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import styled from 'styled-components';
import { IoPersonAdd } from "react-icons/io5";

const App = () => {
    const [showUserForm, setShowUserForm] = useState(false);

    return (
        <UserProvider>
            <Container>

                <StyledHeading>
                    <h1 className="my-4">User Management</h1>
                    <button className='button' onClick={() => setShowUserForm(true)}>
                        <span className="button__text">Add User</span>
                        <span className="button__icon">
                            <IoPersonAdd />
                        </span>
                    </button>
                </StyledHeading>

                {/* USER LIST */}
                <UserList /> 

                {/* FORM MODAL ADD USER */}
                <UserForm
                    show={showUserForm}
                    onHide={() => setShowUserForm(false)}
                />
            </Container>
        </UserProvider>
    );
};

const StyledHeading = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    --color: #696cff;
    --colorhover: #0004e0;
    --coloractive: #006e58;
    h1 {
        color: var(--color);;
        font-size: clamp(1rem, 2.5vw, 2rem);
    }
    .button {
        display: flex;
        height: 40px;
        padding: 0;
        background: var(--color);
        border: none;
        outline: none;
        border-radius: 5px;
        overflow: hidden;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        &:hover {
            background: var(--colorhover);
        }
        &:active {
            background: var(--coloractive);
        }
        &__text,
        &__icon {
            display: inline-flex;
            align-items: center;
            padding: 0 15px;
            color: #fff;
            height: 100%;
        }
        &__icon {
            font-size: 1.5em;
            background: rgba(0, 0, 0, 0.08);
        }
    }
`
export default App;
