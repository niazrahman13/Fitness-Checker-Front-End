import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Appointment = () => {
  const [nutritionists, setNutritionists] = useState([]);
  const currentUser = useSelector(selectCurrentUser);
  const userId = currentUser?.userId;

  useEffect(() => {
    fetchNutritionists();
  }, []);

  const fetchNutritionists = async () => {
    try {
      const response = await axios.get('https://fitnesschecker.vercel.app/api/v1/nutritionists/data');
      setNutritionists(response.data);
    } catch (error) {
      console.error('Error fetching nutritionists:', error);
    }
  };

  const handleAppointment = async (nutritionistId:any, nutritionistName:any, index:any) => {
    try {
      if (nutritionists[index].isBooked) {
        // If already booked, cancel the appointment
        await axios.delete(`https://fitnesschecker.vercel.app/api/v1/nutritionists/book-appointment/${nutritionistId}`);
        toast.success(`Appointment cancelled with ${nutritionistName}`);
      } else {
        // Otherwise, book the appointment
        const response = await axios.post(`https://fitnesschecker.vercel.app/api/v1/nutritionists/book-appointment`, {
          userId,
          nutritionistId,
        });
        toast.success(`Appointment booked with ${nutritionistName}`);
        console.log(response);
      }
      // Update the state to toggle the booking status
      const updatedNutritionists = [...nutritionists];
      updatedNutritionists[index].isBooked = !updatedNutritionists[index].isBooked;
      setNutritionists(updatedNutritionists);
    } catch (error) {
      console.error('Error handling appointment:', error);
      toast.error('You already Booked This');
    }
  };
  

  return (
    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
      <h2 className='m-2'>Appointment</h2>
      <ToastContainer />
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nutritionists.map((nutritionist:any, index:number) => (
                <TableRow key={nutritionist.id}>
                  <TableCell>{nutritionist.name}</TableCell>
                  <TableCell>{nutritionist.email}</TableCell>
                  <TableCell>
                    {nutritionist.isBooked ? (
                      <Button variant="contained" disabled>
                        Booked
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleAppointment(nutritionist.id, nutritionist.name, index);
                        }}
                        style={{ backgroundColor: 'green', color: 'white' }}
                      >
                        Book Appointment
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Appointment;
