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

const Home= {
  id: 'group-pages',
  title: <FormattedMessage id="Home" />,
  type: 'group',
  url: '/dashboard/default',
  icon: icons.maintenance,
  // children: [
  //   {
  //     id: 'Home',
  //     title: <FormattedMessage id="Home" />,
  //     type: 'collapse',
  //     icon: icons.maintenance,
  //   },
   
  // ]
};

export default Home;
