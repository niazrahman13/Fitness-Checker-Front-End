import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

interface BmiEntry {
  bmi: number;
  bmiStatus: string;
  recommendations: string;
  date: string;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
};

const formatBmi = (bmi: number) => {
  return bmi.toFixed(2);
};

const UserDashboard = () => {
  const [bmiHistory, setBmiHistory] = useState<BmiEntry[]>([]);
  const [bmiData, setBmiData] = useState<{ bmi: number; bmiStatus: string; recommendations: string } | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(bmiData)
  const currentUser = useSelector(selectCurrentUser);
  const userId = currentUser?.userId;


  useEffect(() => {
    const fetchBmiHistoryAndData = async () => {
      try {
        if (userId) {
          
          const dataResponse = await axios.get(`https://fitnesschecker.vercel.app/api/v1/users/bmi/${userId}`);
          const data = dataResponse.data.bmiData._id;
          console.log(data)
          if (data) {
            setBmiData(data);
          } else {
            throw new Error('BMI data not found');
          }
          const historyResponse = await axios.get(`https://fitnesschecker.vercel.app/api/v1/users/bmi/history/${data}`);
          
          setBmiHistory(historyResponse.data.bmiHistory);
          
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching BMI data:', error);
        console.error('Error fetching BMI history:', error);
        setLoading(false);
      }
    };

    fetchBmiHistoryAndData();
  }, [userId]);

  const handleDelete = async (index: number) => {
    try {
      if (userId) {
        await axios.delete(`https://fitnesschecker.vercel.app/api/v1/users/bmi/history/${bmiData}/${index}`);
        // Remove the deleted entry from the local state
        const updatedBmiHistory = [...bmiHistory];
        updatedBmiHistory.splice(index, 1);
        setBmiHistory(updatedBmiHistory);
      }
    } catch (error) {
      console.error('Error deleting BMI history entry:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <TableContainer component={Paper}>
      {bmiHistory.length === 0 ? (
        <div style={{ fontSize: '20px', textAlign: 'center', padding: '20px' }}>No BMI history data available</div>
      ) : (
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="right">BMI</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bmiHistory.map((entry, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {formatDate(entry.date)}
                </StyledTableCell>
                <StyledTableCell align="right">{formatBmi(entry.bmi)}</StyledTableCell>
                <StyledTableCell align="right">{entry.bmiStatus}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button variant="contained" onClick={() => handleDelete(index)}>Delete</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default UserDashboard;
