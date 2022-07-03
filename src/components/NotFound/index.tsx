import React from 'react';
import styles from './NotFoundBlock.module.scss';
const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <span className={styles.smile}>😕</span>
      <h1>Ничего не найдено</h1>
      <p>К сожалению, данная страница отсутствует в нашем интернет-магазине</p>
    </div>
  );
};

export default NotFoundBlock;
