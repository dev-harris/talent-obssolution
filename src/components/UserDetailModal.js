import React, { useState } from 'react';
import { Modal, Col } from 'react-bootstrap';
import { useUsers } from '../hooks/useUsers';
import UserForm from './UserForm';
import { IoMdClose } from "react-icons/io";
import { IoPersonRemove } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";

const UserDetailModal = ({ user, onHide }) => {
    const { deleteUser } = useUsers();
    const [showEditForm, setShowEditForm] = useState(false);

    const handleDelete = () => {
        
        deleteUser(user.id);
        onHide();
    };

    return (
        <>
            <Modal show={true} onHide={onHide} centered={true}>
                <button className='closeIcon' onClick={onHide}><IoMdClose /></button>
                <Modal.Body className='modal-detail row row-cols-auto'>
                    <Col>
                        <img src={`https://picsum.photos/seed/${user.id}/100`} alt="Profile" className="rounded mb-3" />
                    </Col>
                    <Col lg={7} xs={12}>
                        <p className='fs-5 fw-semibold'>{user.name}</p>
                        <p className='m-0'><strong>Email:</strong> {user.email}</p>
                        <p className='m-0'><strong>Phone:</strong> {user.phone}</p>
                        <p className='m-0'><strong>Website:</strong> {user.website}</p>
                    </Col>
                </Modal.Body>
                <Modal.Footer>
                    <button className='button' onClick={handleDelete}>
                        <span className="button__text">Delete</span>
                        <span className="button__icon">
                            <IoPersonRemove />
                        </span>
                    </button>
                    <button className='button' onClick={() => setShowEditForm(true)}>
                        <span className="button__text">Edit</span>
                        <span className="button__icon">
                            <FaUserEdit />
                        </span>
                    </button>
                    
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
