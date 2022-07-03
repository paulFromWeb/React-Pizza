import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { PizzaBlockProps } from './PizzaBlock';
import { addItems } from './redux/slices/cartSlice';
import { RootState } from './redux/store';

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = useState<any>();
  const isMounted = useRef(false);
  const pizzaTypes = ['тонкое', 'традиционное'];
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.filter(
      (obj: any) => obj.title == (pizza ? pizza.title : '')
    )
  );
  const total = cartItem
    .map((item: any) => {
      return item.count;
    })
    .reduce(function (sum: number, current: number) {
      return sum + current;
    }, 0);
  const [activeType, setActiveType] = useState(
    pizza != undefined && pizza.types.length > 1
      ? 'тонкое'
      : pizzaTypes[pizza !== undefined ? pizza.types[0] : 0]
  );
  const [activeSize, setActiveSize] = useState(0);
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(
      addItems({
        title: pizza.title,
        price: pizza.price,
        imageUrl: pizza.imageUrl,
        size: pizza.sizes[activeSize],
        type: activeType,
        id,
      })
    );
  };
  useEffect(() => {
    if (!isMounted.current) {
      const fetchPizza = async () => {
        try {
          const res = await axios.get(
            `https://62ac2c6a9fa81d00a7ab3000.mockapi.io/items/${id}`
          );
          setPizza(res.data);
        } catch (err) {
          alert('Оу,произошла ошибка!Пицца не найдена');
          navigate('/');
        }
      };
      fetchPizza();
    } else {
      isMounted.current = true;
    }
  }, []);
  if (!pizza) {
    return <>Идет загрузка...</>;
  } else {
    return (
      <div className="content">
        <div className="content__Image">
          <img src={pizza.imageUrl} alt="" />
        </div>
        <div className="content__Info">
          <h1>{pizza.title}</h1>
          <h2>{pizza.descr}</h2>
          <div className="pizza-block__selector">
            <ul>
              {pizza.types.map((index: number, i: number) => {
                return (
                  <li
                    key={i}
                    onClick={() => setActiveType(pizzaTypes[index])}
                    className={activeType === pizzaTypes[index] ? 'active' : ''}
                  >
                    {pizzaTypes[index]}
                  </li>
                );
              })}
            </ul>
            <ul>
              {pizza.sizes.map((elem: number, i: number) => {
                return (
                  <li
                    key={elem}
                    onClick={() => setActiveSize(i)}
                    className={activeSize === i ? 'active' : ''}
                  >
                    {elem} см.
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="pizza-block__bottom">
            <div className="pizza-block__price">от {pizza.price} ₽</div>
            <div
              onClick={addToCart}
              className="button button--outline button--add"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                  fill="white"
                ></path>
              </svg>
              <span>Добавить</span>
              <i>{cartItem ? total : 0}</i>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default FullPizza;
