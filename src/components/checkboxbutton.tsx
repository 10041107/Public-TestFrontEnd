// import React, { useState } from 'react';
// import { Button, Checkbox } from 'antd';

// const Checkboxbutton: React.FC = () => {
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const [checked, setChecked] = useState<boolean>(true);
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const [disabled, setDisabled] = useState<boolean>(false);

//   const toggleChecked = () => {
//     setChecked(!checked);
//   };

//   const toggleDisable = () => {
//     setDisabled(!disabled);
//   };

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     console.log('checked = ', e.target.checked);
//     setChecked(e.target.checked);
//   };

//   const label = `${checked ? 'Checked' : 'Unchecked'}-${disabled ? 'Disabled' : 'Enabled'}`;

//   return (
//     <>
//       <p style={{ marginBottom: '20px' }}>
//         <Checkbox checked={checked} disabled={disabled} onChange={onChange}>
//           {label}
//         </Checkbox>
//       </p>
//       <p>
//         <Button type="primary" size="small" onClick={toggleChecked}>
//           {!checked ? 'Check' : 'Uncheck'}
//         </Button>
//         <Button style={{ margin: '0 10px' }} type="primary" size="small" onClick={toggleDisable}>
//           {!disabled ? 'Disable' : 'Enable'}
//         </Button>
//       </p>
//     </>
//   );
// };

// export default Checkboxbutton;
