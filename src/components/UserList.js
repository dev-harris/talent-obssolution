import React, { useEffect, useRef, useState } from 'react';
import { FormControl, ListGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useUsers } from '../hooks/useUsers';
import UserDetailModal from './UserDetailModal';
import styled from 'styled-components';
import { BsThreeDotsVertical } from 'react-icons/bs';
import UserForm from './UserForm';

const UserList = () => {
    const { users, searchTerm, setSearchTerm, editUser, deleteUser } = useUsers();
    const [selectedUser, setSelectedUser] = useState(null);
    const [showUser, setShowUser] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    // Filter users based on searchTerm
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleUserClick = (user) => {
        setSelectedUser(user);
        
        setShowUser(true);
        setShowOptions(false);
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
        
        setShowEditForm(true);
        setShowOptions(false);
    };
    
    const handleDeleteClick = (userId) => {
        deleteUser(userId);
        setShowOptions(false);
    };

    const toggleOptions = (user) => {
        setCurrentUser(user);
        setShowOptions(prev => !prev);
    };
    
    return (
        <StyledList>
            <FormControl
                type="text"
                placeholder="Search by name..."
                className="mb-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <ListGroup className='user-list'>
                {filteredUsers.map(user => (
                    <ListGroup.Item key={user.id}>
                        <div className="d-flex align-items-center cursor-pointer" onClick={() => handleUserClick(user)}>
                            <img src={`https://picsum.photos/seed/${user.id}/50`} alt="Profile" className="rounded-circle me-2" />
                            {user.name}
                        </div>
                        <div className="button-option">
                            <Button 
                                variant="link" 
                                className="text-dark" 
                                onClick={() => toggleOptions(user)}
                            >
                                <BsThreeDotsVertical />
                            </Button>
                            {showOptions && currentUser === user && (
                                <div className="option-list">
                                    <Button variant="link" onClick={(e) => { e.stopPropagation(); handleEditClick(user); }}>Edit</Button>
                                    <Button variant="link" onClick={(e) => { e.stopPropagation(); handleDeleteClick(user.id); }}>Delete</Button>
                
                                </div>
                            )}
                        </div>
                        
                    </ListGroup.Item>
                ))}
            </ListGroup>

            {showEditForm && (
                <UserForm
                    show={showEditForm}
                    onHide={() => setShowEditForm(false)}
                    userToEdit={selectedUser}
                />
            )}

            {showUser && (
                <UserDetailModal
                    user={selectedUser}
                    onHide={() => setShowUser(false)}
                />
            )}
        </StyledList>
    );
};
const StyledList = styled.div `
    .user-list {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 15px;
        .list-group-item {
            border-radius: 10px;
            height:68px;
        }
        @media (min-width: 768px) {
            grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 1024px) {
            grid-template-columns: repeat(4, 1fr);
        }
    }
    .button-option {
        position: absolute;
        top: 0;
        right: 0;
    }
    .option-list {
        position: absolute;
        right: 0;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        z-index: 3;
        button {
            padding:3px 10px;
            text-decoration: none;
            color:#000;
            font-size: 12px;
        }
    }

`
export default UserList;
