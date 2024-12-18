import React, { useState, useEffect } from 'react';
import { FetchAllAssignments } from 'api/assignments';
import { toast } from 'react-toastify';
import { Card, CardContent, Typography, Box, Button, Grid } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import QuichLinks from 'components/QuichLinks';
import SwitchButton from 'components/SwitchButton';

const Assignments = () => {
  const theme = useTheme();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ongoing'); 

  const today = new Date();

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

  // Filter assignments based on due date
  const ongoingAssignments = assignments.filter(
    (assignment) => new Date(assignment.dueDate) >= today
  );

  const previousAssignments = assignments.filter(
    (assignment) => new Date(assignment.dueDate) < today
  );

  // Determine which list to render based on activeTab
  const displayedAssignments =
    activeTab === 'ongoing' ? ongoingAssignments : previousAssignments;

  return (
    <div>
      <QuichLinks />
      <SwitchButton activeTab={activeTab} setActiveTab={setActiveTab} />

      {loading ? (
        <p>Loading...</p>
      ) : displayedAssignments.length > 0 ? (
        <Grid container spacing={3}>
          {displayedAssignments.map((assignment) => (
            <Grid item xs={12} sm={6} md={6} key={assignment.id}>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  position: 'relative',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
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
                    fontWeight: 'bold',
                  }}
                >
                  {assignment.subject.name}
                </Box>

                <CardContent
                  sx={{
                    flex: '1 1 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {assignment.title}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold" gutterBottom>
                    Assigned by: {`${assignment.addedBy.user.firstName} ${assignment.addedBy.user.lastName}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Assigned On: {new Date(assignment.addedBy.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1" sx={{ marginTop: 2 }}>
                    {assignment.description}
                  </Typography>

                  <Box
                    sx={{
                      marginTop: 'auto',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                    }}
                  >
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Last Date of Submission: {new Date(assignment.dueDate).toLocaleDateString()}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ borderRadius: 20, textTransform: 'none' }}
                        onClick={() => {
                          if (assignment.attachmentUrl) {
                            const anchor = document.createElement('a');
                            anchor.href = assignment.attachmentUrl;
                            anchor.setAttribute('download', assignment.title || 'attachment');
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
        <p>No {activeTab === 'ongoing' ? 'ongoing' : 'previous'} assignments found.</p>
      )}
    </div>
  );
};

export default Assignments;
