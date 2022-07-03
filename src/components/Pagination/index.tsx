import React from 'react';
import styles from './Pagination.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { activePageSelector, setActivePage } from '../redux/slices/filterSlice';
const Pagination: React.FC = () => {
  const activePage = useSelector(activePageSelector);
  const dispatch = useDispatch();
  const buttons = ['1', '2', '3'];
  const addPage = (str: string) => {
    if (str === 'back' && activePage > 1) {
      dispatch(setActivePage(activePage - 1));
    } else if (str !== 'back' && activePage < 3) {
      dispatch(setActivePage(activePage + 1));
    }
  };
  console.log(activePage);
  return (
    <div className={styles.root}>
      <span className={styles.changeButtons} onClick={() => addPage('back')}>
        {'<'}
      </span>
      {buttons.map((button, i) => {
        console.log(activePage === i + 1);
        return (
          <span
            onClick={() => dispatch(setActivePage(i + 1))}
            key={i}
            className={activePage == i + 1 ? styles.selected : ''}
          >
            {button}
          </span>
        );
      })}
      <span className={styles.changeButtons} onClick={() => addPage('forward')}>
        {'>'}
      </span>
    </div>
  );
};

export default Pagination;
