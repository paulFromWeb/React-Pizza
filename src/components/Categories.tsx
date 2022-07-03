import { useSelector, useDispatch } from 'react-redux';
import { filterSelector, setActiveCategory } from './redux/slices/filterSlice';

const Categories: React.FC = () => {
  const { activeCategory, categories } = useSelector(filterSelector);
  const dispatch = useDispatch();
  return (
    <div className="categories">
      <ul>
        {categories.map((elem: any, i: number) => {
          return (
            <li
              key={i}
              onClick={() => dispatch(setActiveCategory(i))}
              className={activeCategory === i ? 'active' : ''}
            >
              {elem}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Categories;
