import { useDrag } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredients.module.css";
import { useSelector } from 'react-redux';

const Ingredient = ({ ingredient, onIngredientClick }) => {
  const count = useSelector((store) => {
    const ingredientCount = store.constructorReducer.constructorIngredients.filter((item) => item._id === ingredient._id).length;
    const bunCount = store.constructorReducer.bun?._id === ingredient._id ? 1 : 0;
    return ingredientCount + bunCount;
  });

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: () => ({ ...ingredient, id: uuidv4() }),
  });

  return (
    <li
      ref={dragRef}
      className={styles["ingredient-item"]}
      onClick={() => onIngredientClick(ingredient)}
    >
      {count > 0 && (
        <div className={styles['header-counter']}>
          <Counter count={count} size="default" extraClass={styles.counter} />
        </div>
      )}
      <img src={ingredient.image} alt={ingredient.name} />
      <div className={styles.price}>
        <span className="text text_type_digits-default">{ingredient.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles["ingredient-text"]} text text_type_main-default`}>{ingredient.name}</p>
      {ingredient.count > 0 && <Counter count={ingredient.count} size="default" />}
    </li>
  );
};

export default Ingredient;
