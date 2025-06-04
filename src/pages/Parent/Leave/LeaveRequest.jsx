import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Stack,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Switch
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export const LeaveRequest = ({ open, handleClose }) => {
  const [leaveType, setLeaveType] = useState('');
  const [multipleDays, setMultipleDays] = useState(false);
  const [singleDate, setSingleDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const leaveRequestData = {
      leaveType,
      multipleDays,
      date: multipleDays
        ? {
            from: fromDate?.format('YYYY-MM-DD'),
            to: toDate?.format('YYYY-MM-DD')
          }
        : singleDate?.format('YYYY-MM-DD'),
      description,
      file
    };

    console.log('Leave Request Submitted:', leaveRequestData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Request Leave</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <FormControl fullWidth required>
              <InputLabel>Leave Type</InputLabel>
              <Select value={leaveType} onChange={(e) => setLeaveType(e.target.value)} label="Leave Type">
                <MenuItem value="Sick">Sick Leave</MenuItem>
                <MenuItem value="Casual">Casual Leave</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={<Switch checked={multipleDays} onChange={(e) => setMultipleDays(e.target.checked)} color="primary" />}
              label="Multiple Days?"
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {multipleDays ? (
                <>
                  <DatePicker
                    label="From Date"
                    value={fromDate}
                    onChange={(newValue) => setFromDate(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth required />}
                  />
                  <DatePicker
                    label="To Date"
                    value={toDate}
                    onChange={(newValue) => setToDate(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth required />}
                  />
                </>
              ) : (
                <DatePicker
                  label="Date"
                  value={singleDate}
                  onChange={(newValue) => setSingleDate(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth required />}
                />
              )}
            </LocalizationProvider>

            <TextField
              label="Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
              fullWidth
              required
              placeholder="Enter reason or additional details about the leave..."
            />

            <TextField
              type="file"
              fullWidth
              onChange={(e) => setFile(e.target.files[0])}
              inputProps={{ accept: '.pdf,.jpg,.png,.jpeg' }}
              helperText="Attach a supporting document (e.g., medical prescription)"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

LeaveRequest.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};
