// import React, { useState } from 'react';
// import { IconButton, Select, MenuItem, TextField, Box, Typography } from '@mui/material';
// import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';

// const Pagination = ({ page, take, itemCount, pageCount, onPageChange }) => {
//   const [inputPage, setInputPage] = useState(page + 1); // Initializing inputPage with the 1-based index of the current page.

//   // Function to handle rows per page change
//   const handleRowsPerPageChange = (event) => {
//     const newRowsPerPage = event.target.value;
//     onPageChange(0, newRowsPerPage); // Reset to first page when changing rows per page
//   };

//   // Function to handle page change
//   const handlePageChange = (newPage) => {
//     if (newPage >= 0 && newPage < pageCount) {
//       onPageChange(newPage, take);
//       setInputPage(newPage + 1); // Adjust for 1-based page input
//     }
//   };

//   // Function to handle input field change
//   const handleInputChange = (event) => {
//     const value = parseInt(event.target.value, 10);
//     setInputPage(event.target.value);
//     if (!isNaN(value) && value > 0 && value <= pageCount) {
//       handlePageChange(value - 1);
//     }
//   };

//   return (
//     <Box display="flex" alignItems="center" justifyContent="space-between" padding={2}>
//       {/* Left: Rows per page */}
//       <Box display="flex" alignItems="center" gap={2}>
//         <Typography variant="body2">Rows per page:</Typography>
//         <Select
//           value={take}
//           onChange={handleRowsPerPageChange}
//           size="small"
//         >
//           {[10, 20, 30 ,50].map((size) => (
//             <MenuItem key={size} value={size}>{size}</MenuItem>
//           ))}
//         </Select>
//       </Box>

//       {/* Center: Go to page input */}
//       <Box display="flex" alignItems="center" gap={2}>
//         <Typography variant="body2">Go to</Typography>

//         <TextField
//           type="number"
//           size="small"
//           value={inputPage}
//           onChange={handleInputChange}
//           inputProps={{
//             min: 1,
//             max: pageCount,
//             style: { textAlign: 'center', width: '50px' }
//           }}
//         />

//         <Typography variant="body2">
//           of {pageCount}
//         </Typography>
//       </Box>

//       {/* Right: Navigation buttons */}
//       <Box display="flex" alignItems="center" gap={2}>
//         <IconButton
//           onClick={() => handlePageChange(page - 1)}
//           disabled={page === 0}
//           size="small"
//         >
//           <ArrowBackIosNew fontSize="small" />
//         </IconButton>

//         <IconButton
//           onClick={() => handlePageChange(page + 1)}
//           disabled={page === pageCount - 1}
//           size="small"
//         >
//           <ArrowForwardIos fontSize="small" />
//         </IconButton>
//       </Box>
//     </Box>
//   );
// };

// export default Pagination;



import React, { useState, useEffect } from 'react';
import { IconButton, Select, MenuItem, TextField, Box, Typography } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';

const Pagination = ({ totalRows, rowsPerPageOptions = [10, 20, 30], onPageChange, page, setPage, take }) => {
  const [inputPage, setInputPage] = useState(page + 1); // inputPage is 1-based index

  const totalPages = Math.ceil(totalRows / take);

  useEffect(() => {
    setInputPage(page + 1); // Sync the input page with the current page
  }, [page]);

  const handleRowsPerPageChange = (event) => {
    setPage(0); // Reset page when changing rows per page
    onPageChange(0, event.target.value);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
      onPageChange(newPage, take);
    }
  };

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setInputPage(event.target.value);

    if (!isNaN(value) && value > 0 && value <= totalPages) {
      handlePageChange(value - 1); // Convert to 0-based index
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" padding={2}>
      <Box display="flex" alignItems="center" gap={2}>
        <Typography variant="body2">Rows per page:</Typography>
        <Select
          value={take}
          onChange={handleRowsPerPageChange}
          size="small"
        >
          {rowsPerPageOptions.map((size) => (
            <MenuItem key={size} value={size}>{size}</MenuItem>
          ))}
        </Select>
      </Box>

      <Box display="flex" alignItems="center" gap={2}>
        <IconButton onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
          <ArrowBackIosNew />
        </IconButton>
        
        <TextField
          value={inputPage}
          onChange={handleInputChange}
          size="small"
          inputProps={{ min: 1, max: totalPages }}
          type="number"
          variant="outlined"
        />
        
        <IconButton onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1}>
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Pagination;
