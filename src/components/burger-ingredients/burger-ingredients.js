import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import { addIngredient } from "../../services/actions/ingredients";
import { openModal } from "../../services/actions/modal";
import { TAB_SWITCH } from "../../services/actions/tabs";

import {
  Counter,
  CurrencyIcon,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngredients() {
  const dispatch = useDispatch();
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const currentTab = useSelector((store) => store.tabs.currentTab);
  console.log("currentTab: ", currentTab);

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

  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainsRef = useRef(null);
  const ingredientsWrapperRef = useRef(null);

  const switchTab = (tab) => {
    dispatch({ type: TAB_SWITCH, payload: tab });

    switch (tab) {
      case "buns":
        if (bunsRef.current)
          bunsRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "sauces":
        if (saucesRef.current)
          saucesRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "mains":
        if (mainsRef.current)
          mainsRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  };

  const onAdd = (ingredient) => {
    dispatch(addIngredient(ingredient));
  };

  useEffect(() => {
    const observerOptions = {
      root: ingredientsWrapperRef.current,
      rootMargin: "0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          dispatch({ type: TAB_SWITCH, payload: id });
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (bunsRef.current) observer.observe(bunsRef.current);
    if (saucesRef.current) observer.observe(saucesRef.current);
    if (mainsRef.current) observer.observe(mainsRef.current);

    return () => {
      if (bunsRef.current) observer.unobserve(bunsRef.current);
      if (saucesRef.current) observer.unobserve(saucesRef.current);
      if (mainsRef.current) observer.unobserve(mainsRef.current);
    };
  }, [dispatch]);

  return (
    <section className={styles["burger-ingredients"]}>
      <p className="text text_type_main-large pt-10 pb-5">Соберите бургер</p>
      <div className={`${styles["tab-container"]} pb-10`}>
        <Tab
          value="buns"
          active={currentTab === "buns"}
          className={styles.tab}
          onClick={() => switchTab("buns")}
        >
          Булки
        </Tab>
        <Tab
          value="sauces"
          active={currentTab === "sauces"}
          className={styles.tab}
          onClick={() => switchTab("sauces")}
        >
          Соусы
        </Tab>
        <Tab
          value="mains"
          active={currentTab === "mains"}
          className={styles.tab}
          onClick={() => switchTab("mains")}
        >
          Начинки
        </Tab>
      </div>
      <div ref={ingredientsWrapperRef} className={styles.ingredients}>
        <section id="buns" ref={bunsRef}>
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
                onClick={() => {
                  onAdd(ingredient);
                  dispatch(
                    openModal(
                      "ingredientDetails",
                      { ingredient },
                      "Детали ингредиента"
                    )
                  );
                }}
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

        <section id="sauces" ref={saucesRef}>
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
                onClick={() => {
                  onAdd(ingredient);
                  dispatch(
                    openModal(
                      "ingredientDetails",
                      { ingredient },
                      "Детали ингредиента"
                    )
                  );
                }}
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

        <section id="mains" ref={mainsRef}>
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
                onClick={() => {
                  onAdd(ingredient);
                  dispatch(
                    openModal(
                      "ingredientDetails",
                      { ingredient },
                      "Детали ингредиента"
                    )
                  );
                }}
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

export default BurgerIngredients;
