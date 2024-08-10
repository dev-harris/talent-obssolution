import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('/users.json')
            .then((response) => response.json())
            .then((data) => {
                // Sort data by name A-Z
                const sortedUsers = data.sort((a, b) => a.name.localeCompare(b.name));
                setUsers(sortedUsers);
            });
    }, []);

    const addUser = (newUser) => {
        setUsers((prevUsers) => [...prevUsers, newUser].sort((a, b) => a.name.localeCompare(b.name)));
    };

    const editUser = (updatedUser) => {
        setUsers((prevUsers) =>
            prevUsers.map(user => (user.id === updatedUser.id ? updatedUser : user)).sort((a, b) => a.name.localeCompare(b.name))
        );
    };

    const deleteUser = (userId) => {
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
    };

    return (
        <UserContext.Provider value={{ users, addUser, editUser, deleteUser, searchTerm, setSearchTerm }}>
            {children}
        </UserContext.Provider>
    );
};