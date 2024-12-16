import React, { useState, useEffect } from 'react';
import { FetchAllAssignments } from 'api/assignments';
import { toast } from 'react-toastify';
import { Card, CardContent, Typography, Box, Button, Grid } from '@mui/material';
import EcommerceDataCard from 'components/cards/statistics/EcommerceDataCard';
import EcommerceDataChart from 'sections/widget/chart/EcommerceDataChart';
import { ArrowDown, ArrowUp, Book, Calendar, CloudChange, Wallet3 } from 'iconsax-react';

import { useTheme } from '@mui/material/styles';

const Assignments = () => {
  const theme = useTheme();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const data = await FetchAllAssignments();
        setAssignments(data.data.data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
        toast.error('Unable to fetch assignments. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <EcommerceDataCard
            title="All Earnings"
            count="$3000"
            iconPrimary={<Wallet3 />}
            percentage={
              <Typography color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} /> 30.6%
              </Typography>
            }
          >
            <EcommerceDataChart color={theme.palette.primary.main} />
          </EcommerceDataCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <EcommerceDataCard
            title="Page Views"
            count="290+"
            color="warning"
            iconPrimary={<Book color={theme.palette.warning.dark} />}
            percentage={
              <Typography color="warning.dark" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ArrowDown size={16} style={{ transform: 'rotate(-45deg)' }} /> 30.6%
              </Typography>
            }
          >
            <EcommerceDataChart color={theme.palette.warning.dark} />
          </EcommerceDataCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <EcommerceDataCard
            title="Total task"
            count="1,568"
            color="success"
            iconPrimary={<Calendar color={theme.palette.success.darker} />}
            percentage={
              <Typography color="success.darker" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} /> 30.6%
              </Typography>
            }
          >
            <EcommerceDataChart color={theme.palette.success.darker} />
          </EcommerceDataCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <EcommerceDataCard
            title="Download"
            count="$200"
            color="error"
            iconPrimary={<CloudChange color={theme.palette.error.dark} />}
            percentage={
              <Typography color="error.dark" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ArrowDown size={16} style={{ transform: 'rotate(45deg)' }} /> 30.6%
              </Typography>
            }
          >
            <EcommerceDataChart color={theme.palette.error.dark} />
          </EcommerceDataCard>
        </Grid>
      </Grid>

      {/* <h1>Assignments</h1> */}
      {loading ? (
        <p>Loading...</p>
      ) : assignments.length > 0 ? (
        <Grid container spacing={3} mt={2}>
          {assignments.map((assignment) => (
            <Grid item xs={12} sm={6} md={6} key={assignment.id}>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  position: 'relative',
                  height: '100%', // Ensures consistent height
                  display: 'flex',
                  flexDirection: 'column' // Enables proper vertical layout
                }}
              >
                {/* Subject Tag */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    backgroundColor: '#FFA726',
                    color: '#fff',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontWeight: 'bold'
                  }}
                >
                  {assignment.subject.name}
                </Box>

                <CardContent
                  sx={{
                    flex: '1 1 auto', // Makes the content take up remaining space
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between' // Ensures footer stays at the bottom
                  }}
                >
                  {/* Title */}
                  <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {assignment.title}
                  </Typography>

                  {/* Assigned By */}
                  <Typography variant="body1" fontWeight="bold" gutterBottom>
                    Assigned by: {`${assignment.addedBy.user.firstName} ${assignment.addedBy.user.lastName}`}
                  </Typography>

                  {/* Assigned On */}
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Assigned On: {new Date(assignment.addedBy.createdAt).toLocaleDateString()}
                  </Typography>

                  {/* Description */}
                  <Typography variant="body1" sx={{ marginTop: 2 }}>
                    {assignment.description}
                  </Typography>

                  {/* Footer (Due Date and Download Button) */}
                  <Box sx={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    {/* Due Date */}
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Last Date of Submission: {new Date(assignment.dueDate).toLocaleDateString()}
                    </Typography>

                    {/* Download Button */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                    <Button
  variant="contained"
  color="primary"
  sx={{ borderRadius: 20, textTransform: 'none' }}
  onClick={() => {
    if (assignment.attachmentUrl) {
      // Create a temporary anchor element
      const anchor = document.createElement('a');
      anchor.href = assignment.attachmentUrl;

      // Add a `download` attribute for direct download
      anchor.setAttribute('download', assignment.title || 'attachment');

      // Append the anchor to the document body, click it, and remove it
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } else {
      toast.error('No attachment available.');
    }
  }}
>
  Download
</Button>

                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No assignments found.</p>
      )}
    </div>
  );
};

export default Assignments;
