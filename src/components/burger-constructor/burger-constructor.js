import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import styles from "./burger-constructor.module.css";
import { updateOrderTotal, sendOrder } from "../../services/actions/order";
import {
  addIngredient,
  removeIngredient,
  incrementCount,
  decrementCount
} from "../../services/actions/constructor";

import {
  Button,
  Counter,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const burgerBun = useSelector((store) => store.constructorReducer.bun);
  const ingredients = useSelector(
    (store) => store.constructorReducer.constructorIngredients
  );
  const orderTotal = useSelector((store) => store.order.orderTotal);
  const constructorWrapperRef = useRef(null);

  const [, dropRef] = useDrop(() => ({
    accept: "ingredient",
    drop: (item) => {
      dispatch(addIngredient(item));
      dispatch(incrementCount(item._id));
      dispatch(updateOrderTotal());
      return { name: "BurgerConstructor" };
    },
  }));

  const onDelete = (ingredient) => {
    dispatch(removeIngredient(ingredient.key));
    dispatch(decrementCount(ingredient._id));
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
      <div ref={dropRef} className={styles["main-block-components"]}>
        <div className={`${styles["constructor-fixed-top"]} mt-25`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={burgerBun ? `${burgerBun.name} (верх)` : "Выберите булку"}
            price={burgerBun ? burgerBun.price : 0}
            thumbnail={burgerBun ? burgerBun.image : ""}
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
              .filter((ingredient) => ingredient.type !== "bun")
              .map((ingredient) => (
                <div
                  key={ingredient.key}
                  className={styles["constructor-item"]}
                >
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    handleClose={() => onDelete(ingredient)}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className={styles["constructor-fixed-bottom"]}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={burgerBun ? `${burgerBun.name} (низ)` : "Выберите булку"}
            price={burgerBun ? burgerBun.price : 0}
            thumbnail={burgerBun ? burgerBun.image : ''}
          />
        </div>
      </div>
      <div className={`${styles.total} pt-10`}>
        <div className={styles["total-price"]}>
          <Counter
            count={orderTotal}
            size="default"
            extraClass={styles.counter}
          />
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
