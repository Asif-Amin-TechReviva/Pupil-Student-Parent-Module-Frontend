// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { I24Support, MessageProgramming } from 'iconsax-react';

// type

// icons
// icons
const icons = {
  maintenance: MessageProgramming,
  contactus: I24Support
};

// ==============================|| MENU ITEMS - PAGES ||============================== //

const AttendanceAndLeave = {
  id: 'group-pages',
  // title: <FormattedMessage id="Academics" />,
  type: 'group',
  children: [
    {
      id: 'Attendance & Leave',
      title: <FormattedMessage id="Attendance & Leave" />,
      type: 'collapse',
      icon: icons.maintenance,
      children: [
        {
          id: 'View Attendance',
          title: <FormattedMessage id="Attendance" />,
          type: 'item',
          url: '/apps/profiles/account/attendance',
          breadcrumbs: false

          // target: true
        },
        {
          id: 'Leave',
          title: <FormattedMessage id="Leave" />,
          type: 'item',
          url: '/academics/view-grades',
          breadcrumbs: false
          // target: true
        }
        // {
        //   id: 'Bulk Edit',
        //   title: <FormattedMessage id="Bulk Edit" />,
        //   type: 'item',
        //   url: '/cashier/bulk-edit',
        //   // target: true
        // },
      ]
    }
  ]
};

export default AttendanceAndLeave;
