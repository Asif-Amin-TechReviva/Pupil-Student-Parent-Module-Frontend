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

const Fee= {
  id: 'group-pages',
  title: <FormattedMessage id="Fee" />,
  type: 'group',
  children: [
    {
      id: 'Fee',
      title: <FormattedMessage id="Fee" />,
      type: 'collapse',
      icon: icons.maintenance,
      children: [
        {
          id: 'Add Cashier',
          title: <FormattedMessage id="Add Cashier" />,
          type: 'item',
          url: '/cashier/add-cashier',
          // target: true
        },
        {
          id: 'Cashier List',
          title: <FormattedMessage id="Cashier List" />,
          type: 'item',
          url: '/cashier/cashier-list',
          // target: true
        },
        {
          id: 'Bulk Edit',
          title: <FormattedMessage id="Bulk Edit" />,
          type: 'item',
          url: '/cashier/bulk-edit',
          // target: true
        },
       
        
          
      ]
    },
   
  ]
};

export default Fee;
