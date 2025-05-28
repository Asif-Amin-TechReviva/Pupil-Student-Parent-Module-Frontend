// import React from 'react';
// import { Box, Typography, Divider } from '@mui/material';

// const examData = [
//   {
//     unit: 'Unit I',
//     date: '12/10/2024',
//     score: 80,
//     remark: 'Very good improvement',
//     color: '#00897B'
//   },
//   {
//     unit: 'Unit II',
//     date: '12/10/2024',
//     score: 45,
//     remark: 'Needs improvement',
//     color: '#E53935'
//   },
//   {
//     unit: 'Unit III',
//     date: '12/10/2024',
//     score: 45,
//     remark: 'Needs improvement',
//     color: '#E53935'
//   },
//   {
//     unit: 'Unit IV',
//     date: '12/10/2024',
//     score: 60,
//     remark: 'Average',
//     color: '#F9A825'
//   }
// ];

// const ExamsView = () => {
//   return (
//     <Box sx={{ padding: 0, bgcolor: '#f8f9fa', borderRadius: 2 }}>
//       {examData.map((item, index) => (
//         <Box
//           key={index}
//           sx={{
//             display: 'flex',
//             padding:'0px',
//             alignItems: 'center',
//             backgroundColor: '#fff',
//             borderRadius: index === 0 ? '8px 8px 0 0' : index === examData.length - 1 ? '0 0 8px 8px' : 0,
//             overflow: 'hidden',
//             mb: index === examData.length - 1 ? 0 : 1,
//             boxShadow: '0px 0px 1px rgba(0,0,0,0.1)'
//           }}
//         >
//           {/* Colored vertical bar */}
//           <Box sx={{ width: 4, bgcolor: index === 0 ? '#00897B' : 'transparent' }} />

//           {/* Row content */}
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               flex: 1,
//               p: 2
//             }}
//           >
//             {/* Unit */}
//             <Typography sx={{ flex: 1 }} fontWeight="500">
//               {item.unit}
//             </Typography>

//             {/* Date */}
//             <Typography sx={{ flex: 1, textAlign: 'center' }}>{item.date}</Typography>

//             {/* Score */}
//             <Typography sx={{ flex: 1, textAlign: 'center', color: item.color, fontWeight: 600 }}>{item.score}%</Typography>

//             {/* Remark */}
//             <Typography sx={{ flex: 1, textAlign: 'right', fontWeight: 600 }}>{item.remark}</Typography>
//           </Box>
//         </Box>
//       ))}
//     </Box>
//   );
// };

// export default ExamsView;


import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

const examData = [
  {
    unit: 'Unit I',
    date: '12/10/2024',
    score: 80,
    remark: 'Very good improvement',
    color: '#00897B',
  },
  {
    unit: 'Unit II',
    date: '12/10/2024',
    score: 45,
    remark: 'Needs improvement',
    color: '#E53935',
  },
  {
    unit: 'Unit III',
    date: '12/10/2024',
    score: 45,
    remark: 'Needs improvement',
    color: '#E53935',
  },
  {
    unit: 'Unit IV',
    date: '12/10/2024',
    score: 60,
    remark: 'Average',
    color: '#F9A825',
  },
];

const ExamsView = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ padding: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
      {/* Header Row */}
      {!isMobile && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: '8px 8px 0 0',
            p: 2,
            fontWeight: 600,
            boxShadow: '0px 0px 1px rgba(0,0,0,0.1)',
            mb: 1,
          }}
        >
          <Box sx={{ width: 4 }} />
          <Typography sx={{ flex: 1 }}>Exam</Typography>
          <Typography sx={{ flex: 1, textAlign: 'center' }}>Date</Typography>
          <Typography sx={{ flex: 1, textAlign: 'center' }}>Marks</Typography>
          <Typography sx={{ flex: 1, textAlign: 'right' }}>Remarks</Typography>
        </Box>
      )}

      {examData.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            backgroundColor: '#fff',
            borderRadius: index === examData.length - 1 ? '0 0 8px 8px' : 0,
            overflow: 'hidden',
            mb: index === examData.length - 1 ? 0 : 1,
            boxShadow: '0px 0px 1px rgba(0,0,0,0.1)',
          }}
        >
          {/* Colored vertical bar */}
          <Box sx={{ width: isMobile ? '100%' : 4, height: isMobile ? 4 : 'auto', bgcolor: item.color }} />

          {/* Row content */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              flex: 1,
              p: 2,
              gap: isMobile ? 1 : 0,
            }}
          >
            <Typography sx={{ flex: 1, fontWeight: 500 }}>{item.unit}</Typography>
            <Typography sx={{ flex: 1, textAlign: isMobile ? 'left' : 'center' }}>{item.date}</Typography>
            <Typography
              sx={{
                flex: 1,
                textAlign: isMobile ? 'left' : 'center',
                color: item.color,
                fontWeight: 600,
              }}
            >
              {item.score}%
            </Typography>
            <Typography
              sx={{
                flex: 1,
                textAlign: isMobile ? 'left' : 'right',
                fontWeight: 600,
              }}
            >
              {item.remark}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ExamsView;
