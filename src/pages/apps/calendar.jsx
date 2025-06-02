// import { useEffect, useRef, useState } from 'react';

// import useMediaQuery from '@mui/material/useMediaQuery';
// import Box from '@mui/material/Box';
// import Dialog from '@mui/material/Dialog';
// import Tooltip from '@mui/material/Tooltip';
// import SpeedDial from '@mui/material/SpeedDial';

// // third-party
// import FullCalendar from '@fullcalendar/react';
// import interactionPlugin from '@fullcalendar/interaction';
// import listPlugin from '@fullcalendar/list';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import timelinePlugin from '@fullcalendar/timeline';

// // project imports
// import { PopupTransition } from 'components/@extended/Transitions';
// import CalendarStyled from 'sections/apps/calendar/CalendarStyled';
// import Toolbar from 'sections/apps/calendar/Toolbar';
// import AddEventForm from 'sections/apps/calendar/AddEventForm';

// import { useGetEvents, updateEvent } from 'api/calender';

// // assets
// import { Add } from 'iconsax-react';

// // ==============================|| CALENDAR - MAIN ||============================== //

// export default function Calendar() {
//   const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

//   const [isModalOpen, setModalOpen] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState();
//   const [calendarView, setCalendarView] = useState();
//   const [date, setDate] = useState(new Date());
//   const [selectedRange, setSelectedRange] = useState(null);
//   const calendarRef = useRef(null);
//   const { events } = useGetEvents();

//   useEffect(() => {
//     const calendarEl = calendarRef.current;
//     if (calendarEl) {
//       const calendarApi = calendarEl.getApi();
//       const newView = matchDownSM ? 'listWeek' : 'dayGridMonth';
//       calendarApi.changeView(newView);
//       setCalendarView(newView);
//     }

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [matchDownSM]);

//   // calendar toolbar events
//   const handleDateToday = () => {
//     const calendarEl = calendarRef.current;

//     if (calendarEl) {
//       const calendarApi = calendarEl.getApi();

//       calendarApi.today();
//       setDate(calendarApi.getDate());
//     }
//   };

//   const handleViewChange = (newView) => {
//     const calendarEl = calendarRef.current;

//     if (calendarEl) {
//       const calendarApi = calendarEl.getApi();

//       calendarApi.changeView(newView);
//       setCalendarView(newView);
//     }
//   };

//   const handleDatePrev = () => {
//     const calendarEl = calendarRef.current;

//     if (calendarEl) {
//       const calendarApi = calendarEl.getApi();

//       calendarApi.prev();
//       setDate(calendarApi.getDate());
//     }
//   };

//   const handleDateNext = () => {
//     const calendarEl = calendarRef.current;

//     if (calendarEl) {
//       const calendarApi = calendarEl.getApi();

//       calendarApi.next();
//       setDate(calendarApi.getDate());
//     }
//   };

//   // calendar events
//   const handleRangeSelect = (arg) => {
//     const calendarEl = calendarRef.current;
//     if (calendarEl) {
//       const calendarApi = calendarEl.getApi();
//       calendarApi.unselect();
//     }

//     setSelectedRange({ start: arg.start, end: arg.end });
//     setModalOpen(true);
//   };

//   const handleEventSelect = (arg) => {
//     if (arg?.event?.id) {
//       const event = events.find((event) => event.id === arg.event.id);
//       setSelectedEvent(event);
//     }

//     setModalOpen(true);
//   };

//   const handleEventUpdate = async ({ event }) => {
//     await updateEvent(event.id, {
//       allDay: event.allDay,
//       start: event.start,
//       end: event.end
//     });
//     setModalOpen(true);
//   };

//   const modalCallback = (openModal) => {
//     // open/close modal based on dialog state
//     if (isModalOpen) {
//       setSelectedEvent(undefined);
//     }
//     setModalOpen(openModal);
//   };

//   const handleModal = () => {
//     if (isModalOpen) {
//       setSelectedEvent(undefined);
//     }
//     setModalOpen(!isModalOpen);
//   };

//   return (
//     <Box sx={{ position: 'relative' }}>
//       <CalendarStyled>
//         <Toolbar
//           date={date}
//           view={calendarView}
//           onClickNext={handleDateNext}
//           onClickPrev={handleDatePrev}
//           onClickToday={handleDateToday}
//           onChangeView={handleViewChange}
//         />

//         <FullCalendar
//           weekends
//           editable
//           droppable
//           selectable
//           events={events}
//           ref={calendarRef}
//           rerenderDelay={10}
//           initialDate={date}
//           initialView={calendarView}
//           dayMaxEventRows={3}
//           eventDisplay="block"
//           headerToolbar={false}
//           allDayMaintainDuration
//           eventResizableFromStart
//           select={handleRangeSelect}
//           eventDrop={handleEventUpdate}
//           eventClick={handleEventSelect}
//           eventResize={handleEventUpdate}
//           height={matchDownSM ? 'auto' : 720}
//           plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
//         />
//       </CalendarStyled>

//       {/* Dialog renders its body even if not open */}
//       <Dialog
//         maxWidth="sm"
//         TransitionComponent={PopupTransition}
//         fullWidth
//         onClose={handleModal}
//         open={isModalOpen}
//         sx={{ '& .MuiDialog-paper': { p: 0, bgcolor: 'secondary.lighter' } }}
//       >
//         <AddEventForm modalCallback={modalCallback} event={selectedEvent} range={selectedRange} onCancel={handleModal} />
//       </Dialog>
//       <Tooltip title="Add New Event">
//         <SpeedDial
//           ariaLabel="add-event-fab"
//           sx={{ display: 'inline-flex', position: 'sticky', bottom: 24, left: '100%', transform: 'translate(-50%, -50% )' }}
//           icon={<Add />}
//           onClick={handleModal}
//         />
//       </Tooltip>
//     </Box>
//   );
// }











// import { useEffect, useRef, useState } from 'react';

// import useMediaQuery from '@mui/material/useMediaQuery';
// import Box from '@mui/material/Box';
// import Dialog from '@mui/material/Dialog';
// import Tooltip from '@mui/material/Tooltip';
// import SpeedDial from '@mui/material/SpeedDial';

// import FullCalendar from '@fullcalendar/react';
// import interactionPlugin from '@fullcalendar/interaction';
// import listPlugin from '@fullcalendar/list';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import timelinePlugin from '@fullcalendar/timeline';

// import { PopupTransition } from 'components/@extended/Transitions';
// import CalendarStyled from 'sections/apps/calendar/CalendarStyled';
// import Toolbar from 'sections/apps/calendar/Toolbar';
// import AddEventForm from 'sections/apps/calendar/AddEventForm';

// import { updateEvent } from 'api/calender';

// import { Add } from 'iconsax-react';

// const getRandomStatus = () => {
//   const statuses = [
//     { title: 'Present', color: '#ccf2e2', type: 'present' },
//     { title: 'Absent', color: '#f8c7c7', type: 'absent' },
//     { title: 'Leave', color: '#ffeac2', type: 'leave' },
//     { title: 'Holiday', color: '#b3ccf2', type: 'holiday' }
//   ];
//   return statuses[Math.floor(Math.random() * statuses.length)];
// };

// const sampleEvents = [];
// const month = 4; // May (0-indexed, so January = 0)
// const year = 2025;

// for (let day = 1; day <= 31; day++) {
//   const date = new Date(year, month, day);
//   if (date.getMonth() !== month) continue;

//   const status = getRandomStatus();

//   sampleEvents.push({
//     id: `${day}`,
//     title: status.title,
//     start: `${year}-05-${String(day).padStart(2, '0')}`,
//     end: `${year}-05-${String(day).padStart(2, '0')}`,
//     display: 'background',
//     color: status.color,
//     type: status.type
//   });
// }

// console.log(sampleEvents);



// export default function Calendar() {
//   const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

//   const [isModalOpen, setModalOpen] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState();
//   const [calendarView, setCalendarView] = useState();
//   const [date, setDate] = useState(new Date());
//   const [selectedRange, setSelectedRange] = useState(null);
//   const calendarRef = useRef(null);
//   const events = sampleEvents; 

//   useEffect(() => {
//     const calendarEl = calendarRef.current;
//     if (calendarEl) {
//       const calendarApi = calendarEl.getApi();
//       const newView = matchDownSM ? 'listWeek' : 'dayGridMonth';
//       calendarApi.changeView(newView);
//       setCalendarView(newView);
//     }
//   }, [matchDownSM]);

//   const handleDateToday = () => {
//     const calendarApi = calendarRef.current?.getApi();
//     if (calendarApi) {
//       calendarApi.today();
//       setDate(calendarApi.getDate());
//     }
//   };

//   const handleViewChange = (newView) => {
//     const calendarApi = calendarRef.current?.getApi();
//     if (calendarApi) {
//       calendarApi.changeView(newView);
//       setCalendarView(newView);
//     }
//   };

//   const handleDatePrev = () => {
//     const calendarApi = calendarRef.current?.getApi();
//     if (calendarApi) {
//       calendarApi.prev();
//       setDate(calendarApi.getDate());
//     }
//   };

//   const handleDateNext = () => {
//     const calendarApi = calendarRef.current?.getApi();
//     if (calendarApi) {
//       calendarApi.next();
//       setDate(calendarApi.getDate());
//     }
//   };

//   const handleRangeSelect = (arg) => {
//     calendarRef.current?.getApi().unselect();
//     setSelectedRange({ start: arg.start, end: arg.end });
//     setModalOpen(true);
//   };

//   const handleEventSelect = (arg) => {
//     const event = events.find((e) => e.id === arg.event.id);
//     setSelectedEvent(event);
//     setModalOpen(true);
//   };

//   const handleEventUpdate = async ({ event }) => {
//     await updateEvent(event.id, {
//       allDay: event.allDay,
//       start: event.start,
//       end: event.end
//     });
//     setModalOpen(true);
//   };

//   const modalCallback = (openModal) => {
//     if (isModalOpen) setSelectedEvent(undefined);
//     setModalOpen(openModal);
//   };

//   const handleModal = () => {
//     if (isModalOpen) setSelectedEvent(undefined);
//     setModalOpen(!isModalOpen);
//   };

//   return (
//     <Box sx={{ position: 'relative' }}>
//       <CalendarStyled>
//         <Toolbar
//           date={date}
//           view={calendarView}
//           onClickNext={handleDateNext}
//           onClickPrev={handleDatePrev}
//           onClickToday={handleDateToday}
//           onChangeView={handleViewChange}
//         />

//         <FullCalendar
//           weekends
//           editable
//           droppable
//           selectable
//           events={events}
//           ref={calendarRef}
//           rerenderDelay={10}
//           initialDate={date}
//           initialView={calendarView}
//           dayMaxEventRows={3}
//           eventDisplay="block"
//           headerToolbar={false}
//           allDayMaintainDuration
//           eventResizableFromStart
//           select={handleRangeSelect}
//           eventDrop={handleEventUpdate}
//           eventClick={handleEventSelect}
//           eventResize={handleEventUpdate}
//           height={matchDownSM ? 'auto' : 720}
//           plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
//           eventContent={(arg) => {
//             const type = arg.event.extendedProps.type;
//             if (type === 'leave') return <div style={{ color: '#e07b00', fontSize: '0.75rem' }}>Leave</div>;
//             if (type === 'holiday') return <div style={{ color: '#3f51b5', fontSize: '0.75rem' }}>Holiday</div>;
//             if (type === 'absent') return <div style={{ color: '#c62828', fontSize: '0.75rem' }}>Absent</div>;
//             if (type === 'present') return null;
//             return null;
//           }}
//         />
//       </CalendarStyled>

//       <Dialog
//         maxWidth="sm"
//         TransitionComponent={PopupTransition}
//         fullWidth
//         onClose={handleModal}
//         open={isModalOpen}
//         sx={{ '& .MuiDialog-paper': { p: 0, bgcolor: 'secondary.lighter' } }}
//       >
//         <AddEventForm modalCallback={modalCallback} event={selectedEvent} range={selectedRange} onCancel={handleModal} />
//       </Dialog>

//       <Tooltip title="Add New Event">
//         <SpeedDial
//           ariaLabel="add-event-fab"
//           sx={{
//             display: 'inline-flex',
//             position: 'sticky',
//             bottom: 24,
//             left: '100%',
//             transform: 'translate(-50%, -50%)'
//           }}
//           icon={<Add />}
//           onClick={handleModal}
//         />
//       </Tooltip>
//     </Box>
//   );
// }









import { useEffect, useRef, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import SpeedDial from '@mui/material/SpeedDial';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import { PopupTransition } from 'components/@extended/Transitions';
import CalendarStyled from 'sections/apps/calendar/CalendarStyled';
import Toolbar from 'sections/apps/calendar/Toolbar';
import AddEventForm from 'sections/apps/calendar/AddEventForm';
import { updateEvent } from 'api/calender';
import { Add } from 'iconsax-react';

const getRandomStatus = () => {
  const random = Math.random();
  if (random < 0.7) {
    return { title: 'Present', color: '#ccf2e2', type: 'present' };
  } else if (random < 0.8) {
    return { title: 'Absent', color: '#f8c7c7', type: 'absent' };
  } else if (random < 0.9) {
    return { title: 'Leave', color: '#ffeac2', type: 'leave' };
  } else {
    return { title: 'Holiday', color: '#b3ccf2', type: 'holiday' };
  }
};

const sampleEvents = [];
const month = 4; // May (0-indexed, so January = 0)
const year = 2025;

for (let day = 1; day <= 31; day++) {
  const date = new Date(year, month, day);
  if (date.getMonth() !== month) continue;
  
  // If it's Sunday, mark as disabled
  if (date.getDay() === 0) {
    sampleEvents.push({
      id: `${day}-off`,
      title: '',
      start: `${year}-05-${String(day).padStart(2, '0')}`,
      end: `${year}-05-${String(day).padStart(2, '0')}`,
      display: 'background',
      color: '#f5f5f5', // Light gray for disabled
      textColor: '#bdbdbd', // Gray text
      type: 'off',
      editable: false,
      className: 'disabled-day'
    });
    continue;
  }

  const status = getRandomStatus();
  sampleEvents.push({
    id: `${day}`,
    title: status.title,
    start: `${year}-05-${String(day).padStart(2, '0')}`,
    end: `${year}-05-${String(day).padStart(2, '0')}`,
    display: 'background',
    color: status.color,
    type: status.type,
    className: 'enabled-day'
  });
}

export default function Calendar() {
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState();
  const [calendarView, setCalendarView] = useState();
  const [date, setDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState(null);
  const calendarRef = useRef(null);
  const events = sampleEvents; 

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = matchDownSM ? 'listWeek' : 'dayGridMonth';
      calendarApi.changeView(newView);
      setCalendarView(newView);
    }
  }, [matchDownSM]);

  const handleDateToday = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleViewChange = (newView) => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.changeView(newView);
      setCalendarView(newView);
    }
  };

  const handleDatePrev = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleDateNext = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  const handleRangeSelect = (arg) => {
    calendarRef.current?.getApi().unselect();
    setSelectedRange({ start: arg.start, end: arg.end });
    setModalOpen(true);
  };

  const handleEventSelect = (arg) => {
    const event = events.find((e) => e.id === arg.event.id);
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleEventUpdate = async ({ event }) => {
    await updateEvent(event.id, {
      allDay: event.allDay,
      start: event.start,
      end: event.end
    });
    setModalOpen(true);
  };

  const modalCallback = (openModal) => {
    if (isModalOpen) setSelectedEvent(undefined);
    setModalOpen(openModal);
  };

  const handleModal = () => {
    if (isModalOpen) setSelectedEvent(undefined);
    setModalOpen(!isModalOpen);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <CalendarStyled>
        <Toolbar
          date={date}
          view={calendarView}
          onClickNext={handleDateNext}
          onClickPrev={handleDatePrev}
          onClickToday={handleDateToday}
          onChangeView={handleViewChange}
        />

        <FullCalendar
          weekends
          editable
          droppable
          selectable
          events={events}
          ref={calendarRef}
          rerenderDelay={10}
          initialDate={date}
          initialView={calendarView}
          dayMaxEventRows={3}
          eventDisplay="block"
          headerToolbar={false}
          allDayMaintainDuration
          eventResizableFromStart
          select={handleRangeSelect}
          eventDrop={handleEventUpdate}
          eventClick={handleEventSelect}
          eventResize={handleEventUpdate}
          height={matchDownSM ? 'auto' : 720}
          plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
          eventContent={(arg) => {
            const type = arg.event.extendedProps.type;
            if (type === 'leave') return <div style={{ color: '#e07b00', fontSize: '0.75rem' }}>Leave</div>;
            if (type === 'holiday') return <div style={{ color: '#3f51b5', fontSize: '0.75rem' }}>Holiday</div>;
            if (type === 'absent') return <div style={{ color: '#c62828', fontSize: '0.75rem' }}>Absent</div>;
            if (type === 'present') return <div style={{ color: '#2e7d32', fontSize: '0.75rem' }}>Present</div>;
            if (type === 'off') return null; // Don't show anything for Sundays
            return null;
          }}
        />
      </CalendarStyled>

      <Dialog
        maxWidth="sm"
        TransitionComponent={PopupTransition}
        fullWidth
        onClose={handleModal}
        open={isModalOpen}
        sx={{ '& .MuiDialog-paper': { p: 0, bgcolor: 'secondary.lighter' } }}
      >
        <AddEventForm modalCallback={modalCallback} event={selectedEvent} range={selectedRange} onCancel={handleModal} />
      </Dialog>

      <Tooltip title="Add New Event">
        <SpeedDial
          ariaLabel="add-event-fab"
          sx={{
            display: 'inline-flex',
            position: 'sticky',
            bottom: 24,
            left: '100%',
            transform: 'translate(-50%, -50%)'
          }}
          icon={<Add />}
          onClick={handleModal}
        />
      </Tooltip>

    
    </Box>
  );
}