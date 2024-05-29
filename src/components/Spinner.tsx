// components/Spinner.tsx
import React from 'react';
import styles from '../styles/spinner.module.css';

const Spinner: React.FC = () => (
  <div className={styles.spinner}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default Spinner;
