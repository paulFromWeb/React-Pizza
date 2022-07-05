import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItems } from '../redux/slices/cartSlice';
import { RootState } from '../redux/store';

export type PizzaBlockProps = {
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  id: number;
  descr: string;
};
const PizzaBlock: React.FC<PizzaBlockProps> = ({
  title,
  price,
  imageUrl,
  sizes,
  types,
  id,
  descr,
}) => {
  const pizzaTypes = ['тонкое', 'традиционное'];
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.filter((obj: any) => obj.title == title)
  );

  const [activeType, setActiveType] = useState(
    types.length > 1 ? 'тонкое' : pizzaTypes[types[0]]
  );
  const [activeSize, setActiveSize] = useState(0);

  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(
      addItems({
        title,
        price,
        imageUrl,
        size: sizes[activeSize],
        type: activeType,
        id,
      })
    );
  };

  const total = cartItem
    .map((item: any) => {
      return item.count;
    })
    .reduce(function (sum: number, current: number) {
      return sum + current;
    }, 0);

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>

        <div className="pizza-block__selector">
          <ul>
            {types.map((index, i, arr) => {
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
            {sizes.map((elem, i) => {
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
          <div className="pizza-block__price">от {price} ₽</div>
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
              />
            </svg>
            <span>Добавить</span>
            <i>{cartItem ? total : 0}</i>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PizzaBlock;
