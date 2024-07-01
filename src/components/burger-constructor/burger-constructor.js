import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./burger-constructor.module.css";
import { removeIngredient } from "../../services/actions/ingredients";
import { updateOrderTotal, sendOrder } from "../../services/actions/order";

import {
  Button,
  Counter,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const ingredients = useSelector(store => store.ingredients.constructorIngredients);
  const orderTotal = useSelector(store => store.order.orderTotal);
  console.log('orderTotal: ', orderTotal);

  const burgerBun = ingredients.find((ingredient) => ingredient.type === "bun");
  const constructorWrapperRef = useRef(null);

  const onDelete = (ingredient) => {
    dispatch(removeIngredient(ingredient));
    dispatch(updateOrderTotal());
  };

  const handleOrderClick = () => {
    const ingredientIds = ingredients.map((ingredient) => ingredient._id);
    dispatch(sendOrder(ingredientIds));
  };

  useEffect(() => {
    dispatch(updateOrderTotal());
  }, [ingredients, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        constructorWrapperRef.current &&
        constructorWrapperRef.current.scrollTop > 0
      ) {
        constructorWrapperRef.current.classList.add(styles.scrolling);
      } else if (constructorWrapperRef.current) {
        constructorWrapperRef.current.classList.remove(styles.scrolling);
      }
    };

    const wrapper = constructorWrapperRef.current;
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
    <section className={styles["burger-components"]}>
      <div className={styles["main-block-components"]}>
        <div className={`${styles["constructor-fixed-top"]} mt-25`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${burgerBun?.name} (верх)`}
            price={burgerBun?.price}
            thumbnail={burgerBun?.image}
          />
        </div>
        <div
          className={styles["constructor-wrapper"]}
          ref={constructorWrapperRef}
        >
          <div
            className={styles["main-constructor"]}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {ingredients
              .slice(1)
              .filter((ingredient) => ingredient.type !== "bun")
              .map((ingredient) => (
                <div
                  key={ingredient._id}
                  className={styles["constructor-item"]}
                  onClick={() => onDelete(ingredient)}
                >
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className={styles["constructor-fixed-bottom"]}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${burgerBun?.name} (низ)`}
            price={burgerBun?.price}
            thumbnail={burgerBun?.image}
          />
        </div>
      </div>
      <div className={`${styles.total} pt-10`}>
        <div className={styles["total-price"]}>
          <Counter count={orderTotal} size="default" extraClass={styles.counter} />
          <CurrencyIcon type="primary" size="36" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOrderClick}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
