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

const Academics= {
  id: 'group-pages',
  // title: <FormattedMessage id="Academics" />,
  type: 'group',
  children: [
    {
      id: 'Academics',
      title: <FormattedMessage id="Academics" />,
      type: 'collapse',
      icon: icons.maintenance,
      children: [
        {
          id: 'View Assignments',
          title: <FormattedMessage id="View Assignments" />,
          type: 'item',
          url: '/academics/view-assignments',
          // target: true
        },
        {
          id: 'Grades',
          title: <FormattedMessage id="View Grades" />,
          type: 'item',
          url: '/academics/view-grades',
          // target: true
        },
        // {
        //   id: 'Bulk Edit',
        //   title: <FormattedMessage id="Bulk Edit" />,
        //   type: 'item',
        //   url: '/cashier/bulk-edit',
        //   // target: true
        // },
       
        
          
      ]
    },
   
  ]
};

export default Academics;
