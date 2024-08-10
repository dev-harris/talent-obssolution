import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
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
    h1 {
        color: var(--color);;
        font-size: clamp(1rem, 2.5vw, 2rem);
    }
    .button {
        height: 40px;
        background: var(--color);
        cursor: pointer;
        font-size: 16px;
        &__icon {
            font-size: 1.5em;
        }
    }
`
export default App;
