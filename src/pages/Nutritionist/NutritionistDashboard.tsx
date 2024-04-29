import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const NutritionistDashboard = () => {
  const currentUser = useSelector(selectCurrentUser);
  const userId = currentUser?.userId;
  const [nutritionData, setNutritionData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customName, setCustomName] = useState(null);
  const [noAppointment, setNoAppointment] = useState(false);

  useEffect(() => {
    console.log("User ID:", userId); // Log userId to the console
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://fitnesschecker.vercel.app/api/v1/nutritionists/userdata/${userId}`);
        const userIds = response.data.userIds;        
        setNutritionData(response.data);

        const nutritionistId = response.data.nutritionist._id;  
        setCustomName(nutritionistId);
        setNutritionData(response.data);

        setLoading(false);

        if (userIds && userIds.length > 0) {
          fetchUserData(userIds);
        } else {
          setNoAppointment(true); // Set noAppointment state to true if no appointment data is available
        }
      } catch (error) {
        console.error('Error fetching nutritionist data:', error);
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const fetchUserData = async (userIds:any) => {
    try {
      const userDataPromises = userIds.map(async (id:any) => {
        const userResponse = await axios.get(`https://fitnesschecker.vercel.app/api/v1/users/${id}`);
        
        return userResponse.data;
      });

      const userDataArray = await Promise.all(userDataPromises);
      setUserData(userDataArray);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleDeleteUser = async (nutritionistId:any, userId:any) => {
    try {

      await axios.delete(`https://fitnesschecker.vercel.app/api/v1/nutritionists/userdata/${customName}/user/${userId}`);
      // After successful deletion, update the user data state to remove the deleted user
      setUserData((prevUserData) => prevUserData.filter((user) => user.id !== userId));
      toast.success('User deleted successfully'); // Show success toast message
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user'); // Show error toast message
    }
  };

  return (
    <>
      <ToastContainer /> {/* Toast container */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Height(Feet)</TableCell>
              <TableCell align="right">Height(Inches)</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {noAppointment ? ( // Render message if no appointment data is available
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Typography variant="h6">No appointments</Typography>
                </TableCell>
              </TableRow>
            ) : (
              userData.map((user) => (
                
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">{user.name}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">{user.heightFeet}</TableCell>
                  <TableCell align="right">{user.heightInches}</TableCell>
                  <TableCell align="right">
                    <Button variant="contained" onClick={() => handleDeleteUser(nutritionData._id, user.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default NutritionistDashboard;
