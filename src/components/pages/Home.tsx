import PizzaBlock from '../PizzaBlock/index';
import Sort from '../Sort';
import Categories from '../Categories';
import { useEffect, useRef } from 'react';
import Skeleton from '../PizzaBlock/Skeleton';
import Pagination from '../Pagination';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import {
  activePageSelector,
  filterSelector,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizza } from '../redux/slices/pizzaSlice';
import { RootState, useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const { activeCategory, checked, sortValue, searchValue } =
    useSelector(filterSelector);
  const activePage = useSelector(activePageSelector);
  const dispatch = useAppDispatch();
  const { items, status } = useSelector((state: RootState) => state.pizza);
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const fetchData = async () => {
    dispatch(
      fetchPizza({
        activePage,
        checked,
        activeCategory,
        searchValue,
      })
    );
    window.scrollTo(0, 0);
  };
  const navigate = useNavigate();
  // Первый рендер,если есть query параметры в поисковой строке,Тогда параметры заносятся в редакс и идет запрос на сервер уже с ними
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const obj = sortValue.find(
        (object: any) => object.searchTitle === params.checked
      );
      dispatch(setFilters({ ...params, checked: obj }));
      isSearch.current = true;
    }
  }, []);
  // Первый рендер,если нет query параметров и запрос не ушел на сервер,если есть то ничего не происходит

  useEffect(() => {
    if (isSearch.current === false) {
      fetchData();
    }
    isSearch.current = false;
  }, [checked, activeCategory, activePage, searchValue]);
  // При первом рендере isMounted.current меняется на true,потом если [checked, activeCategory, activePage] меняются,то вставляются query параметры

  useEffect(() => {
    if (isMounted.current) {
      const str = qs.stringify({
        checked: checked.searchTitle,
        activeCategory,
        activePage,
      });
      navigate(`?${str}`);
    }
    isMounted.current = true;
  }, [checked, activeCategory, activePage]);
  return status === 'error' ? (
    <div className="content">
      <div className="container container--error">
        <div className="cart cart--error">
          <h2>
            Не удалось получить пиццы <span>😕</span>
          </h2>
          <p>
            К сожалению,произошла какая-то ошибка.Мы работаем над ее
            исправлением.
            <br />
            Попробуйте зайти позже
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {status === 'loading'
            ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
            : items.map((elem: any, i: number) => {
                return <PizzaBlock key={i} {...elem} />;
              })}
        </div>
        <Pagination />
      </div>
    </div>
  );
};
export default Home;
