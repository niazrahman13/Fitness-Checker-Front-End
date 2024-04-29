// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { selectCurrentUser } from '../../redux/features/auth/authSlice';

// function FoodSuggestion() {
//   const [bmiStatus, setBmiStatus] = useState('');
//   const [foodSuggestions, setFoodSuggestions] = useState([]);
//   const [sortOrder, setSortOrder] = useState('asc'); // Default sort order is ascending
//   const currentUser = useSelector(selectCurrentUser);
  
//   // Define food suggestions with nutrition info and cost based on BMI status
  // const foodsByBmiStatus = {
  //   'Underweight': [
  //     { name: 'Almonds', protein: 6, calories: 160, cost: '$5', description: 'Rich in protein and healthy fats' },
  //     { name: 'Peanut Butter', protein: 7, calories: 190, cost: '$4', description: 'Good source of protein and healthy fats' },
  //     { name: 'Avocado', protein: 2, calories: 160, cost: '$7', description: 'High in healthy fats and fiber' },
  //     { name: 'Chia Seeds', protein: 4, calories: 137, cost: '$6', description: 'Rich in fiber, protein, and omega-3 fatty acids' },
  //     { name: 'Olive Oil', protein: 0, calories: 119, cost: '$3', description: 'Healthy source of monounsaturated fats' },
  //     { name: 'Tofu', protein: 10, calories: 94, cost: '$6', description: 'Plant-based protein option' },
  //     { name: 'Banana', protein: 1.3, calories: 105, cost: '$2', description: 'Good source of potassium and vitamins' },
  //     { name: 'Cottage Cheese', protein: 11, calories: 220, cost: '$5', description: 'High-protein dairy option' },
  //     { name: 'Pumpkin Seeds', protein: 5, calories: 126, cost: '$6', description: 'Rich in protein, iron, and magnesium' },
  //     { name: 'Whole Milk', protein: 8, calories: 150, cost: '$4', description: 'Rich in protein, calcium, and vitamins' }
  //   ],
  //   'Healthy Weight': [
  //     { name: 'Broccoli', protein: 2.8, calories: 55, cost: '$3', description: 'High in fiber and vitamins' },
  //     { name: 'Salmon', protein: 25, calories: 206, cost: '$8', description: 'Rich in omega-3 fatty acids and protein' },
  //     { name: 'Quinoa', protein: 4, calories: 120, cost: '$7', description: 'Complete protein source with essential amino acids' },
  //     { name: 'Greek Yogurt', protein: 10, calories: 100, cost: '$5', description: 'High-protein dairy option with probiotics' },
  //     { name: 'Chicken Breast', protein: 31, calories: 165, cost: '$8', description: 'Lean protein option' },
  //     { name: 'Black Beans', protein: 15, calories: 227, cost: '$4', description: 'High-protein legume with fiber' },
  //     { name: 'Spinach', protein: 0.9, calories: 23, cost: '$2', description: 'Low-calorie and nutrient-dense leafy green' },
  //     { name: 'Eggs', protein: 6, calories: 78, cost: '$3', description: 'Protein-rich breakfast option' },
  //     { name: 'Lean Beef', protein: 36, calories: 250, cost: '$9', description: 'Rich in protein, iron, and vitamins' },
  //     { name: 'Sweet Potato', protein: 2, calories: 90, cost: '$3', description: 'Good source of fiber and vitamins' }
  //   ],
  //   'Overweight': [
  //     { name: 'Apples', protein: 0.5, calories: 95, cost: '$2', description: 'Low in calories and high in fiber' },
  //     { name: 'Spinach', protein: 0.9, calories: 23, cost: '$2', description: 'Low-calorie and nutrient-dense leafy green' },
  //     { name: 'Brown Rice', protein: 5, calories: 216, cost: '$5', description: 'Whole grain option with fiber and nutrients' },
  //     { name: 'Eggs', protein: 6, calories: 78, cost: '$3', description: 'Protein-rich breakfast option' },
  //     { name: 'Lentils', protein: 9, calories: 230, cost: '$4', description: 'High in protein and fiber' },
  //     { name: 'Greek Yogurt', protein: 10, calories: 100, cost: '$5', description: 'High-protein dairy option with probiotics' },
  //     { name: 'Oatmeal', protein: 6, calories: 147, cost: '$3', description: 'High in fiber and complex carbs' },
  //     { name: 'Chickpeas', protein: 19, calories: 269, cost: '$4', description: 'Versatile legume high in protein and fiber' },
  //     { name: 'Salmon', protein: 25, calories: 206, cost: '$8', description: 'Rich in omega-3 fatty acids and protein' },
  //     { name: 'Tuna', protein: 26, calories: 116, cost: '$6', description: 'Lean protein source with omega-3s' }
  //   ],
  //   'Obesity': [
  //     { name: 'Kale', protein: 2.9, calories: 33, cost: '$3', description: 'High in vitamins and minerals' },
  //     { name: 'Spinach', protein: 0.9, calories: 23, cost: '$2', description: 'Low-calorie and nutrient-dense leafy green' },
  //     { name: 'Carrots', protein: 0.9, calories: 41, cost: '$2', description: 'Low-calorie vegetable high in beta-carotene' },
  //     { name: 'Broccoli', protein: 2.8, calories: 55, cost: '$3', description: 'High in fiber and vitamins' },
  //     { name: 'Cucumber', protein: 0.6, calories: 16, cost: '$1', description: 'Low-calorie vegetable high in hydration' },
  //     { name: 'Celery', protein: 0.7, calories: 16, cost: '$1', description: 'Low-calorie vegetable high in fiber' },
  //     { name: 'Lettuce', protein: 1.4, calories: 15, cost: '$1', description: 'Low-calorie leafy green' },
  //     { name: 'Tomatoes', protein: 0.9, calories: 18, cost: '$2', description: 'Low-calorie fruit high in vitamin C' },
  //     { name: 'Bell Peppers', protein: 1.3, calories: 31, cost: '$2', description: 'Colorful vegetable high in vitamin C' },
  //     { name: 'Zucchini', protein: 1.2, calories: 17, cost: '$1', description: 'Low-calorie vegetable high in fiber' }
  //   ]
  // };
  
  
//   useEffect(() => {
//     const fetchBmiData = async () => {
//       try {
//         const userId = currentUser?.userId;
//         if (userId) {
//           const response = await axios.get(`https://fitnesschecker.vercel.app/api/v1/users/bmi/${userId}`);
//           const bmiData = response.data.bmiData;
          
//           if (bmiData) {
//             // Extract BMI status from the fetched data
//             const { bmiStatus } = bmiData;
//             setBmiStatus(bmiStatus);
            
//             // Set food suggestions based on BMI status
//             setFoodSuggestions(foodsByBmiStatus[bmiStatus]);
//           } else {
//             throw new Error('BMI data not found');
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching BMI data:', error);
//       }
//     };

//     fetchBmiData();
//   }, [currentUser, foodsByBmiStatus]);

//   // Function to toggle sort order
//   const toggleSortOrder = () => {
//     setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//   };

//   // Function to sort food suggestions based on cost
//   const sortFoodSuggestions = () => {
//     return foodSuggestions.slice().sort((a, b) => {
//       const costA = parseFloat(a.cost.slice(1)); // Remove the '$' sign and convert to number
//       const costB = parseFloat(b.cost.slice(1));
      
//       if (sortOrder === 'asc') {
//         return costA - costB;
//       } else {
//         return costB - costA;
//       }
//     });
//   };

//   return (
//     <div>
//       <h2>Food Suggestions for {bmiStatus}</h2>
//       <br />
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell align="right">Protein (g)</TableCell>
//               <TableCell align="right">Calories</TableCell>
//               <TableCell align="right" onClick={toggleSortOrder} style={{ cursor: 'pointer' }}>
//                 Estimate Cost {sortOrder === 'asc' ? '▲' : '▼'}
//               </TableCell>
//               <TableCell align="right">Description</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {sortFoodSuggestions().map((food, index) => (
//               <TableRow key={index}>
//                 <TableCell component="th" scope="row">{food.name}</TableCell>
//                 <TableCell align="right">{food.protein}</TableCell>
//                 <TableCell align="right">{food.calories}</TableCell>
//                 <TableCell align="right">{food.cost}</TableCell>
//                 <TableCell align="right">{food.description}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }

// export default FoodSuggestion;

import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

function FoodSuggestion() {
  const [bmiStatus, setBmiStatus] = useState('');
  const [foodSuggestions, setFoodSuggestions] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order is ascending
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    const fetchBmiData = async () => {
      try {
        const userId = currentUser?.userId;
        if (userId) {
          const response = await axios.get(`https://fitnesschecker.vercel.app/api/v1/users/bmi/${userId}`);
          const bmiData = response.data.bmiData;

          if (bmiData) {
            const { bmiStatus } = bmiData;
            setBmiStatus(bmiStatus);
            setFoodSuggestions(foodsByBmiStatus[bmiStatus]);
          } else {
            throw new Error('BMI data not found');
          }
        }
      } catch (error) {
        console.error('Error fetching BMI data:', error);
      }
    };

    fetchBmiData();
  }, [currentUser]);

  const foodsByBmiStatus = {
    'Underweight': [
      { name: 'Almonds', protein: 6, calories: 160, cost: '$5', description: 'Rich in protein and healthy fats' },
      { name: 'Peanut Butter', protein: 7, calories: 190, cost: '$4', description: 'Good source of protein and healthy fats' },
      { name: 'Avocado', protein: 2, calories: 160, cost: '$7', description: 'High in healthy fats and fiber' },
      { name: 'Chia Seeds', protein: 4, calories: 137, cost: '$6', description: 'Rich in fiber, protein, and omega-3 fatty acids' },
      { name: 'Olive Oil', protein: 0, calories: 119, cost: '$3', description: 'Healthy source of monounsaturated fats' },
      { name: 'Tofu', protein: 10, calories: 94, cost: '$6', description: 'Plant-based protein option' },
      { name: 'Banana', protein: 1.3, calories: 105, cost: '$2', description: 'Good source of potassium and vitamins' },
      { name: 'Cottage Cheese', protein: 11, calories: 220, cost: '$5', description: 'High-protein dairy option' },
      { name: 'Pumpkin Seeds', protein: 5, calories: 126, cost: '$6', description: 'Rich in protein, iron, and magnesium' },
      { name: 'Whole Milk', protein: 8, calories: 150, cost: '$4', description: 'Rich in protein, calcium, and vitamins' }
    ],
    'Healthy Weight': [
      { name: 'Broccoli', protein: 2.8, calories: 55, cost: '$3', description: 'High in fiber and vitamins' },
      { name: 'Salmon', protein: 25, calories: 206, cost: '$8', description: 'Rich in omega-3 fatty acids and protein' },
      { name: 'Quinoa', protein: 4, calories: 120, cost: '$7', description: 'Complete protein source with essential amino acids' },
      { name: 'Greek Yogurt', protein: 10, calories: 100, cost: '$5', description: 'High-protein dairy option with probiotics' },
      { name: 'Chicken Breast', protein: 31, calories: 165, cost: '$8', description: 'Lean protein option' },
      { name: 'Black Beans', protein: 15, calories: 227, cost: '$4', description: 'High-protein legume with fiber' },
      { name: 'Spinach', protein: 0.9, calories: 23, cost: '$2', description: 'Low-calorie and nutrient-dense leafy green' },
      { name: 'Eggs', protein: 6, calories: 78, cost: '$3', description: 'Protein-rich breakfast option' },
      { name: 'Lean Beef', protein: 36, calories: 250, cost: '$9', description: 'Rich in protein, iron, and vitamins' },
      { name: 'Sweet Potato', protein: 2, calories: 90, cost: '$3', description: 'Good source of fiber and vitamins' }
    ],
    'Overweight': [
      { name: 'Apples', protein: 0.5, calories: 95, cost: '$2', description: 'Low in calories and high in fiber' },
      { name: 'Spinach', protein: 0.9, calories: 23, cost: '$2', description: 'Low-calorie and nutrient-dense leafy green' },
      { name: 'Brown Rice', protein: 5, calories: 216, cost: '$5', description: 'Whole grain option with fiber and nutrients' },
      { name: 'Eggs', protein: 6, calories: 78, cost: '$3', description: 'Protein-rich breakfast option' },
      { name: 'Lentils', protein: 9, calories: 230, cost: '$4', description: 'High in protein and fiber' },
      { name: 'Greek Yogurt', protein: 10, calories: 100, cost: '$5', description: 'High-protein dairy option with probiotics' },
      { name: 'Oatmeal', protein: 6, calories: 147, cost: '$3', description: 'High in fiber and complex carbs' },
      { name: 'Chickpeas', protein: 19, calories: 269, cost: '$4', description: 'Versatile legume high in protein and fiber' },
      { name: 'Salmon', protein: 25, calories: 206, cost: '$8', description: 'Rich in omega-3 fatty acids and protein' },
      { name: 'Tuna', protein: 26, calories: 116, cost: '$6', description: 'Lean protein source with omega-3s' }
    ],
    'Obesity': [
      { name: 'Kale', protein: 2.9, calories: 33, cost: '$3', description: 'High in vitamins and minerals' },
      { name: 'Spinach', protein: 0.9, calories: 23, cost: '$2', description: 'Low-calorie and nutrient-dense leafy green' },
      { name: 'Carrots', protein: 0.9, calories: 41, cost: '$2', description: 'Low-calorie vegetable high in beta-carotene' },
      { name: 'Broccoli', protein: 2.8, calories: 55, cost: '$3', description: 'High in fiber and vitamins' },
      { name: 'Cucumber', protein: 0.6, calories: 16, cost: '$1', description: 'Low-calorie vegetable high in hydration' },
      { name: 'Celery', protein: 0.7, calories: 16, cost: '$1', description: 'Low-calorie vegetable high in fiber' },
      { name: 'Lettuce', protein: 1.4, calories: 15, cost: '$1', description: 'Low-calorie leafy green' },
      { name: 'Tomatoes', protein: 0.9, calories: 18, cost: '$2', description: 'Low-calorie fruit high in vitamin C' },
      { name: 'Bell Peppers', protein: 1.3, calories: 31, cost: '$2', description: 'Colorful vegetable high in vitamin C' },
      { name: 'Zucchini', protein: 1.2, calories: 17, cost: '$1', description: 'Low-calorie vegetable high in fiber' }
    ]
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortFoodSuggestions = () => {
    return foodSuggestions.slice().sort((a, b) => {
      const costA = parseFloat(a.cost.slice(1));
      const costB = parseFloat(b.cost.slice(1));
      return sortOrder === 'asc' ? costA - costB : costB - costA;
    });
  };

  const downloadPDF = async () => {
    try {
      const input = document.getElementById('food-suggestion-table');
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('food-suggestions.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div>
      <h2>Food Suggestions for {bmiStatus}</h2>
      <TableContainer id="food-suggestion-table" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Protein (g)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right" onClick={toggleSortOrder} style={{ cursor: 'pointer' }}>
                Estimate Cost {sortOrder === 'asc' ? '▲' : '▼'}
              </TableCell>
              <TableCell align="right">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortFoodSuggestions().map((food, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">{food.name}</TableCell>
                <TableCell align="right">{food.protein}</TableCell>
                <TableCell align="right">{food.calories}</TableCell>
                <TableCell align="right">{food.cost}</TableCell>
                <TableCell align="right">{food.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <button onClick={downloadPDF}>Download PDF</button>
    </div>
  );
}

export default FoodSuggestion;
