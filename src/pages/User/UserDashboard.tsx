// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { GaugeContainer, GaugeValueArc, GaugeReferenceArc, useGaugeState } from '@mui/x-charts/Gauge';

// const UserDashboard = () => {
//   const [bmiData, setBmiData] = useState<{ bmi: number; bmiStatus: string; recommendations: string } | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBmiData = async () => {
//       try {
//         const response = await axios.get('https://fitnesschecker.vercel.app/api/v1/users/bmi');
//         const data = response.data.bmiData;
//         if (data) {
//           setBmiData(data);
//         } else {
//           throw new Error('BMI data not found');
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching BMI data:', error);
//         setLoading(false);
//       }
//     };

//     fetchBmiData();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//       <div style={{ textAlign: 'center' }}>
//         {bmiData && (
//           <div>
//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//               <GaugeContainer
//                 width={300}
//                 height={300}
//                 startAngle={-110}
//                 endAngle={110}
//                 value={bmiData.bmi}
//               >
//                 <GaugeReferenceArc />
//                 <GaugeValueArc />
//                 <GaugePointer />
//               </GaugeContainer>
//             </div>
//             <div>
//               <h2 style={{ fontSize: '32px', margin: '20px 0' }}>Your BMI:</h2>
//               <p style={{ fontSize: '32px', margin: '20px 0' }}>{bmiData.bmi?.toFixed(2)}</p>
//               <h3 style={{ fontSize: '28px', margin: '10px 0' }}>BMI Status:</h3>
//               <p style={{ fontSize: '24px', margin: '20px 0' }}>{bmiData.bmiStatus}</p>
//               <h3 style={{ fontSize: '32px', margin: '10px 0' }}>Recommendations:</h3>
//               <p style={{ fontSize: '24px', margin: '20px 0' }}>{bmiData.recommendations}</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const GaugePointer = () => {
//   const { valueAngle, outerRadius, cx, cy } = useGaugeState();

//   if (valueAngle === null) {
//     return null;
//   }

//   const target = {
//     x: cx + outerRadius * Math.sin(valueAngle),
//     y: cy - outerRadius * Math.cos(valueAngle),
//   };
//   return (
//     <g>
//       <circle cx={cx} cy={cy} r={5} fill="red" />
//       <path
//         d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
//         stroke="red"
//         strokeWidth={3}
//       />
//     </g>
//   );
// };

// export default UserDashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { GaugeContainer, GaugeValueArc, GaugeReferenceArc, useGaugeState } from '@mui/x-charts/Gauge';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';

const UserDashboard = () => {
  const [bmiData, setBmiData] = useState<{ bmi: number; bmiStatus: string; recommendations: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const currentUser = useSelector(selectCurrentUser);
  const userId = currentUser?.userId;

  useEffect(() => {
    console.log("User ID:", userId); // Log userId to the console
    const fetchBmiData = async () => {
      try {
        const response = await axios.get(`https://fitnesschecker.vercel.app/api/v1/users/bmi/${userId}`);
        
        const data = response.data.bmiData;
        if (data) {
          setBmiData(data);
        } else {
          throw new Error('BMI data not found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching BMI data:', error);
        setLoading(false);
      }
    };

    if (userId) {
      fetchBmiData();
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        {bmiData && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <GaugeContainer
                width={300}
                height={300}
                startAngle={-110}
                endAngle={110}
                value={bmiData.bmi}
              >
                <GaugeReferenceArc />
                <GaugeValueArc />
                <GaugePointer />
              </GaugeContainer>
            </div>
            <div>
              <h2 style={{ fontSize: '32px', margin: '20px 0' }}>Your BMI:</h2>
              <p style={{ fontSize: '32px', margin: '20px 0' }}>{bmiData.bmi?.toFixed(2)}</p>
              <h3 style={{ fontSize: '28px', margin: '10px 0' }}>BMI Status:</h3>
              <p style={{ fontSize: '24px', margin: '20px 0' }}>{bmiData.bmiStatus}</p>
              <h3 style={{ fontSize: '32px', margin: '10px 0' }}>Recommendations:</h3>
              <p style={{ fontSize: '24px', margin: '20px 0' }}>{bmiData.recommendations}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const GaugePointer = () => {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    return null;
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="red" />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke="red"
        strokeWidth={3}
      />
    </g>
  );
};

export default UserDashboard;
