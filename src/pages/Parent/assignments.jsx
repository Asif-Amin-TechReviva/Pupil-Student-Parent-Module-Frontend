import React, { useState, useEffect } from 'react';
import { FetchAllAssignments, FetchAssignmentDetails } from 'api/assignments';
import { toast } from 'react-toastify';
import { Card, CardContent, Typography, Box, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useTheme } from '@mui/material/styles';
import QuichLinks from 'components/QuichLinks';
import SwitchButton from 'components/SwitchButton';
import Pagination from 'components/Pagination';

const Assignments = () => {
  const theme = useTheme();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ongoing');
  const [page, setPage] = useState(0);
  const [take, setTake] = useState(10);
  const [totalAssignments, setTotalAssignments] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const today = new Date();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const data = await FetchAllAssignments();
        const allAssignments = data.data.data;

        setTotalAssignments(allAssignments.length);

        const paginatedAssignments = allAssignments.slice(page * take, (page + 1) * take);

        const ongoing = paginatedAssignments.filter((assignment) => new Date(assignment.dueDate) >= today);

        const ended = paginatedAssignments.filter((assignment) => new Date(assignment.dueDate) < today);

        setAssignments({ ongoing, ended });
      } catch (error) {
        console.error('Error fetching assignments:', error);
        toast.error('Unable to fetch assignments. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [page, take]);

  const { ongoing, ended } = assignments;

  const handleOpenModal = async (assignmentId) => {
    try {
      setModalLoading(true);
      setOpenModal(true);
      const response = await FetchAssignmentDetails(assignmentId);
      setSelectedAssignment(response);
    } catch (error) {
      console.error('Failed to fetch assignment details:', error);
      toast.error('Failed to load assignment details.');
      setOpenModal(false);
    } finally {
      setModalLoading(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedAssignment(null);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };
  const handleDownload = (url, title) => {
    if (url) {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch the attachment');
          }
          return response.blob();
        })
        .then((blob) => {
          const downloadUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = title || 'attachment';
          link.click();
          window.URL.revokeObjectURL(downloadUrl);
        })
        .catch((error) => {
          console.error('Download failed:', error);
          toast.error('Failed to download attachment.');
        });
    } else {
      toast.error('No attachment available.');
    }
  };

  return (
    <div>
      <QuichLinks />
      <SwitchButton activeTab={activeTab} setActiveTab={setActiveTab} />

      {loading ? (
        <p>Loading...</p>
      ) : (activeTab === 'ongoing' ? ongoing : ended).length > 0 ? (
        <>
          <Grid container spacing={3}>
            {(activeTab === 'ongoing' ? ongoing : ended).map((assignment) => (
              <Grid item xs={12} sm={6} md={6} key={assignment.id}>
                <Card
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
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
                      flex: '1 1 auto',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
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
                      {truncateText(assignment.description, 500)}
                    </Typography>

                    <Box
                      sx={{
                        marginTop: 'auto',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline'
                      }}
                    >
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        Last Date of Submission: {new Date(assignment.dueDate).toLocaleDateString()}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<CloudDownloadIcon />}
                          onClick={() => handleDownload(assignment.attachmentUrl, assignment.title)}
                          sx={{
                            padding: '0.75rem 1.5rem',
                            fontWeight: 'bold',
                            backgroundColor: '#1976D2',
                            '&:hover': {
                              backgroundColor: '#1565C0'
                            }
                          }}
                        >
                          Download
                        </Button>

                        <Button
                          variant="outlined"
                          color="success"
                          backgroundColor= '#1976D2'
                          sx={{ borderRadius: 1, textTransform: 'none', marginLeft: 2 }}
                          onClick={() => handleOpenModal(assignment.id)}
                          
                        >
                          View More
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Pagination
            page={page}
            setPage={setPage}
            take={take}
            totalRows={totalAssignments}
            pageCount={Math.ceil(totalAssignments / take)}
            onPageChange={(newPage, rowsPerPage) => {
              setPage(newPage);
              setTake(rowsPerPage);
            }}
          />
        </>
      ) : (
        <p>No assignments found.</p>
      )}

      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <Box display="flex" justifyContent="space-between" alignItems="baseline" sx={{ padding: { xs: '0.5rem 1rem', sm: '1rem 2rem' } }}>
          <DialogTitle
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '1.25rem', sm: '1.5rem' }, // Smaller font size on small screens
              color: '#1976D2',
              flexGrow: 1
            }}
          >
            Assignment Details
          </DialogTitle>
          <Button  
            onClick={handleCloseModal}
            color="error"
            variant="outlined"
            sx={{
              padding: { xs: '0.5rem 1rem', sm: '0.75rem 1.5rem' }, // Smaller button padding on small screens
              fontSize: { xs: '0.875rem', sm: '1rem' } // Smaller font size on small screens
            }}
          >
            Close

          </Button>
        </Box>

        <DialogContent
          sx={{
            padding: '2rem',
            backgroundColor: '#f9f9f9',
            overflowY: 'auto', // Allows scrolling when content overflows
            maxHeight: '70vh',
            scrollbarWidth: '4px',
            msOverflowStyle: 'none', // Hide scrollbar in Internet Explorer
            '&::-webkit-scrollbar': { display: 'none' } // Hide scrollbar in Webkit-based browsers
          }}
        >
          {modalLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height={200}>
              <CircularProgress />
            </Box>
          ) : (
            selectedAssignment && (
              <Box>
                {/* Assignment Title */}
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ textAlign: 'center', color: '#333', paddingTop: '15px' }}>
                  {selectedAssignment.title}
                </Typography>

                {/* Assignment Description */}
                <Typography variant="body6" paragraph sx={{ lineHeight: 1.6, color: '#555' }}>
                  {selectedAssignment.description}
                </Typography>

                <Divider sx={{ my: 3, borderColor: '#1976D2' }} />

                {/* Date Information */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <Typography variant="body3" color="text.primary">
                    Created At: {new Date(selectedAssignment.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body3" color="error">
                    Due Date: {new Date(selectedAssignment.dueDate).toLocaleDateString()}
                  </Typography>
                </Box>

                {/* Attachment Image */}
                {selectedAssignment.attachmentUrl && (
                  <Box mt={3} textAlign="center" mb={3}>
                    <img
                      src={selectedAssignment.attachmentUrl}
                      alt="Attachment"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '400px',
                        borderRadius: 8,
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        objectFit: 'contain'
                      }}
                    />
                  </Box>
                )}
              </Box>
            )
          )}
        </DialogContent>

        {/* Dialog Actions */}
        <DialogActions sx={{ padding: '1rem 2rem' }}>
          {selectedAssignment?.attachmentUrl && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<CloudDownloadIcon />}
              onClick={() => handleDownload(selectedAssignment.attachmentUrl, selectedAssignment.title)}
              sx={{
                padding: '0.75rem 1.5rem',
                fontWeight: 'bold',
                backgroundColor: '#1976D2',
                '&:hover': {
                  backgroundColor: '#1565C0'
                }
              }}
            >
              Download
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Assignments;
