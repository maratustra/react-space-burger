import { useContext, useEffect, useRef } from "react";
import styles from "./burger-ingredients.module.css";
import PropTypes from "prop-types";

import {
  Counter,
  CurrencyIcon,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { IngredientsContext } from "../../context/ingredientsContext";

function BurgerIngredients({ onIngredientClick }) {
  const { ingredients } = useContext(IngredientsContext);

  const buns = ingredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes("булка")
  );
  const sauces = ingredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes("соус")
  );
  const mains = ingredients.filter(
    (ingredient) =>
      !ingredient.name.toLowerCase().includes("булка") &&
      !ingredient.name.toLowerCase().includes("соус")
  );

  const ingredientsWrapperRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (
        ingredientsWrapperRef.current &&
        ingredientsWrapperRef.current.scrollTop > 0
      ) {
        ingredientsWrapperRef.current.classList.add(styles.scrolling);
      } else if (ingredientsWrapperRef.current) {
        ingredientsWrapperRef.current.classList.remove(styles.scrolling);
      }
    };

    const wrapper = ingredientsWrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (wrapper) {
        wrapper.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <section className={styles["burger-ingredients"]}>
      <p className="text text_type_main-large pt-10 pb-5">Соберите бургер</p>
      <div className={`${styles["tab-container"]} pb-10`}>
        <Tab value="one" active={"one"} className={styles.tab}>
          Булки
        </Tab>
        <Tab value="two" className={styles.tab}>
          Соусы
        </Tab>
        <Tab value="three" className={styles.tab}>
          Начинки
        </Tab>
      </div>
      <div ref={ingredientsWrapperRef} className={styles.ingredients}>
        <section>
          <p
            className={`${styles["ingredient-header"]} text text_type_main-medium`}
          >
            Булки
          </p>
          <ul className={`${styles["ingredients-list"]} mt-6 mb-15 pl-0`}>
            {buns.map((ingredient, index) => (
              <li
                key={ingredient._id}
                className={`${styles["ingredient-item"]} ${
                  index % 2 === 0 ? " ml-4" : ""
                }`}
                onClick={() => onIngredientClick(ingredient)}
              >
                {index === 0 && (
                  <div className={styles["header-counter"]}>
                    <Counter
                      count={1}
                      size="default"
                      extraClass={styles.counter}
                    />
                  </div>
                )}
                <div className="pl-4 pr-4">
                  <img src={ingredient.image} alt="Булка" />
                </div>
                <div className={styles.price}>
                  <Counter
                    count={ingredient.price}
                    size="default"
                    extraClass={styles.counter}
                  />
                  <CurrencyIcon type="primary" />
                </div>
                <p
                  className={`${styles["ingredient-description"]} text text_type_main-small`}
                >
                  {ingredient.name}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <p
            className={`${styles["ingredient-header"]} text text_type_main-medium`}
          >
            Соусы
          </p>
          <ul className={`${styles["ingredients-list"]} mt-6 mb-15 pl-0`}>
            {sauces.map((ingredient, index) => (
              <li
                key={ingredient._id}
                className={`${styles["ingredient-item"]} ${
                  index % 2 === 0 ? " ml-4" : ""
                }`}
                onClick={() => onIngredientClick(ingredient)}
              >
                {index === 2 && (
                  <div className={styles["header-counter"]}>
                    <Counter
                      count={1}
                      size="default"
                      extraClass={styles.counter}
                    />
                  </div>
                )}
                <div className="pl-4 pr-4">
                  <img src={ingredient.image} alt="Соус" />
                </div>
                <div className={styles.price}>
                  <Counter
                    count={ingredient.price}
                    size="default"
                    extraClass={styles.counter}
                  />
                  <CurrencyIcon type="primary" />
                </div>
                <p
                  className={`${styles["ingredient-description"]} text text_type_main-small`}
                >
                  {ingredient.name}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <p
            className={`${styles["ingredient-header"]} text text_type_main-medium`}
          >
            Начинки
          </p>
          <ul className={`${styles["ingredients-list"]} mt-6 mb-15 pl-0`}>
            {mains.map((ingredient) => (
              <li
                key={ingredient._id}
                className={styles["ingredient-item"]}
                onClick={() => onIngredientClick(ingredient)}
              >
                <div className="pl-4 pr-4">
                  <img src={ingredient.image} alt="Начинка" />
                </div>
                <div className={styles.price}>
                  <Counter
                    count={ingredient.price}
                    size="default"
                    extraClass={styles.counter}
                  />
                  <CurrencyIcon type="primary" />
                </div>
                <p
                  className={`${styles["ingredient-description"]} text text_type_main-small`}
                >
                  {ingredient.name}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  onIngredientClick: PropTypes.func.isRequired,
};

export default BurgerIngredients;
