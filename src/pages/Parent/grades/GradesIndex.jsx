// import React from 'react'
// import QuickLinks from "../../components/QuickLinks"
// import SwitchButton from 'components/SwitchButton'
// const Grades = () => {
//   return (
//    <>
//    <QuickLinks/>
//    <SwitchButton/>
//    </>
//   )
// }

// export default Grades


import React, { useState } from 'react';
import QuickLinks from '../../../components/QuickLinks';
import SwitchButton from '../../../components/SwitchButton';
import ExamsView from './ExamsView';
import GradesView from './GradesView'; 

const GradesIndex = () => {
const switchNames = 'fromGrades' 
  const [activeTab, setActiveTab] = useState('exams');

  return (
    <>
      {/* <QuickLinks /> */}
      <SwitchButton activeTab={activeTab} setActiveTab={setActiveTab} switchNames={switchNames}  />
      {activeTab === 'exams' ? <ExamsView /> : <GradesView />}
    </>
  );
};

export default GradesIndex;
