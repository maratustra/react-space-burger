import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./burger-ingredients.module.css";
import { openModal } from "../../services/actions/modal";
import { TAB_SWITCH } from "../../services/actions/tabs";
import Ingredient from "./ingredient";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngredients() {
  const dispatch = useDispatch();
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const currentTab = useSelector((store) => store.tabs.currentTab);

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

  const onIngredientClick = (ingredient) => {
    dispatch(
      openModal("ingredientDetails", { ingredient }, "Детали ингредиента")
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      const bunsTop = bunsRef.current?.getBoundingClientRect().top;
      const saucesTop = saucesRef.current?.getBoundingClientRect().top;
      const mainsTop = mainsRef.current?.getBoundingClientRect().top;
      const wrapperTop =
        ingredientsWrapperRef.current?.getBoundingClientRect().top;

      const distanceBuns = Math.abs(bunsTop - wrapperTop);
      const distanceSauces = Math.abs(saucesTop - wrapperTop);
      const distanceMains = Math.abs(mainsTop - wrapperTop);

      if (distanceBuns < distanceSauces && distanceBuns < distanceMains) {
        dispatch({ type: TAB_SWITCH, payload: "buns" });
      } else if (
        distanceSauces < distanceBuns &&
        distanceSauces < distanceMains
      ) {
        dispatch({ type: TAB_SWITCH, payload: "sauces" });
      } else if (
        distanceMains < distanceBuns &&
        distanceMains < distanceSauces
      ) {
        dispatch({ type: TAB_SWITCH, payload: "mains" });
      }
    };

    const currentIngredients = ingredientsWrapperRef.current

    currentIngredients.addEventListener("scroll", handleScroll)

    return () => currentIngredients.removeEventListener("scroll", handleScroll)
  }, [dispatch])

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
          <ul className={`${styles["ingredients-list"]} mt-6 mb-15 ml-4 pl-0`}>
            {buns.map((ingredient) => (
              <Ingredient
                key={ingredient._id}
                ingredient={ingredient}
                onIngredientClick={onIngredientClick}
              />
            ))}
          </ul>
        </section>

        <section id="sauces" ref={saucesRef}>
          <p
            className={`${styles["ingredient-header"]} text text_type_main-medium`}
          >
            Соусы
          </p>
          <ul className={`${styles["ingredients-list"]} mt-6 mb-15 ml-4 pl-0`}>
            {sauces.map((ingredient) => (
              <Ingredient
                key={ingredient._id}
                ingredient={ingredient}
                onIngredientClick={onIngredientClick}
              />
            ))}
          </ul>
        </section>

        <section id="mains" ref={mainsRef}>
          <p
            className={`${styles["ingredient-header"]} text text_type_main-medium`}
          >
            Начинки
          </p>
          <ul className={`${styles["ingredients-list"]} mt-6 mb-15 ml-4 pl-0`}>
            {mains.map((ingredient) => (
              <Ingredient
                key={ingredient._id}
                ingredient={ingredient}
                onIngredientClick={onIngredientClick}
              />
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}

export default BurgerIngredients;
