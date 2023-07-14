import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import { getFilter } from 'redux/selectors';
import css from './Filter.module.css';

export const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const changeFilter = event => {
    dispatch(setFilter(event.target.value.toLowerCase().trim()));
  };

  return (
    <section className={css.filter}>
      <label className={css.label}>
        <p>Find contacts by name</p>
        <input
          type="text"
          name="filter"
          placeholder="Enter name"
          value={filter}
          onChange={changeFilter}
        />
      </label>
    </section>
  );
};

export default Filter;
