import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [nutritionists, setNutritionists] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchNutritionists();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://fitnesschecker.vercel.app/api/v1/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchNutritionists = async () => {
    try {
      const response = await axios.get('https://fitnesschecker.vercel.app/api/v1/nutritionists');
      setNutritionists(response.data);
    } catch (error) {
      console.error('Error fetching nutritionists:', error);
    }
  };

  const handleDeleteUser = async (userId:any) => {
    try {
      await axios.delete(`https://fitnesschecker.vercel.app/api/v1/users/${userId}`);
      // Refresh users list after deletion
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeleteNutritionist = async (nutritionistId:any) => {
    try {
      await axios.delete(`https://fitnesschecker.vercel.app/api/v1/nutritionists/${nutritionistId}`);
      // Refresh nutritionists list after deletion
      fetchNutritionists();
    } catch (error) {
      console.error('Error deleting nutritionist:', error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <br />
      <h2>Users</h2>
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Account Created Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell>
                  <Button variant="contained" color="error" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add some space between the Users and Nutritionists sections */}
      <div style={{ marginBottom: '30px' }}></div>

      <h2>Nutritionists</h2>
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nutritionist ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Account Created Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nutritionists.map((nutritionist) => (
              <TableRow key={nutritionist.id}>
                <TableCell>{nutritionist.id}</TableCell>
                <TableCell>{nutritionist.name}</TableCell>
                <TableCell>{nutritionist.email}</TableCell>
                <TableCell>{nutritionist.createdAt}</TableCell>
                <TableCell>
                  <Button variant="contained" color="error" onClick={() => handleDeleteNutritionist(nutritionist.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminDashboard;
