import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useUsers } from '../hooks/useUsers';
import { ToastContainer, toast } from 'react-toastify';

const UserForm = ({ show, onHide, userToEdit }) => {
    const { addUser, editUser } = useUsers();
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        website: '',
    });

    useEffect(() => {
        if (userToEdit) {
            setUser(userToEdit);
        }
    }, [userToEdit]);

    const handleSubmit = () => {
        const emptyFields = [];
        Object.keys(user).forEach((key) => {
            if (!user[key]) {
                emptyFields.push(key);
            }
        });

        if (emptyFields.length > 0) {
            toast.error(`Please fill in the following fields: ${emptyFields.join(', ')}`);
            return;
        }

        if (userToEdit) {
            editUser(user);
        } else {
            addUser({ ...user, id: Date.now() });
        }
        onHide();
        setUser({
            name: '',
            email: '',
            phone: '',
            website: '',
        })
    };

    return (
        <>
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{userToEdit ? 'Edit User' : 'Add User'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            value={user.phone}
                            onChange={(e) => setUser({ ...user, phone: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Website</Form.Label>
                        <Form.Control
                            type="text"
                            value={user.website}
                            onChange={(e) => setUser({ ...user, website: e.target.value })}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}>
                    {userToEdit ? 'Save Changes' : 'Add User'}
                </Button>
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
        <ToastContainer />
        </>
    );
};

export default UserForm;
