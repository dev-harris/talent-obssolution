import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useUsers } from '../hooks/useUsers';
import UserForm from './UserForm';

const UserDetailModal = ({ user, onHide }) => {
    const { deleteUser } = useUsers();
    const [showEditForm, setShowEditForm] = useState(false);

    const handleDelete = () => {
        deleteUser(user.id);
        onHide();
    };

    return (
        <>
            <Modal show={true} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{user.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={`https://picsum.photos/seed/${user.id}/100`} alt="Profile" className="rounded mb-3" />
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Website:</strong> {user.website}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    <Button variant="primary" onClick={() => setShowEditForm(true)}>Edit</Button>
                    <Button variant="secondary" onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>

            {/* User Form Modal for Editing */}
            {showEditForm && (
                <UserForm
                    show={showEditForm}
                    onHide={() => setShowEditForm(false)}
                    userToEdit={user}
                />
            )}
        </>
    );
};

export default UserDetailModal;
