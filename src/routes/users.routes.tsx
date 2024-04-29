import Appointment from '../pages/User/Appointment';
import FoodSuggestion from '../pages/User/FoodSuggestion';
import PreviousRecord from '../pages/User/PreviousRecord';
import UpdateBmi from '../pages/User/UpdateBmi';
import UserDashboard from '../pages/User/UserDashboard';

export const userPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <UserDashboard />,
  },
  {
    name: 'Previous Record',
    path: 'previousrecord',
    element: <PreviousRecord />,
  },
  {
    name: 'Update Bmi',
    path: 'updatebmi',
    element: <UpdateBmi />,
  },
  {
    name: 'Food Suggestion',
    path: 'Suggestion',
    element: <FoodSuggestion />,
  }, 
  {
    name: 'Appointment',
    path: 'appointment',
    element: <Appointment />,
  },
];
