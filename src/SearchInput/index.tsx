import React, { useRef } from 'react';
import styles from './SearchInput.module.scss';
import close from '../assets/img/close.png';
import search from '../assets/img/search.png';
import { useState } from 'react';
import debounce from 'lodash.debounce';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../components/redux/slices/filterSlice';
const SearchInput: React.FC = () => {
  const dispatch = useDispatch();
  const [localSearchValue, setLocalSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const onClickClose = () => {
    setLocalSearchValue('');
    dispatch(setSearchValue(''));
    inputRef.current?.focus();
  };
  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 500),
    []
  );
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchValue(e.target.value);
    updateSearchValue(e.target.value);
  };
  return (
    <div className={styles.root}>
      <img className={styles.search} src={search} alt="" />
      <input
        ref={inputRef}
        className={styles.input}
        onChange={(e) => onChangeInput(e)}
        type="text"
        value={localSearchValue}
        placeholder="Поиск пиццы ..."
      />
      {localSearchValue !== '' ? (
        <img
          onClick={onClickClose}
          className={styles.close}
          src={close}
          alt=""
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default SearchInput;
