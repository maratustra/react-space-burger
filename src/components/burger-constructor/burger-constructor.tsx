import { useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDrop, DropTargetMonitor } from "react-dnd";
import styles from "./burger-constructor.module.css";
import { sendOrder } from "../../services/actions/order";
import {
  addIngredient,
  incrementCount,
  moveIngredient,
} from "../../services/actions/constructor";

import {
  Button,
  Counter,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import DraggableIngredient from "./draggable-ingredient";
import { selectOrderTotal } from "../selectors/orderSelector";
import Loader from "../loader";
import { IIngredient, ItemTypes } from "../../types";

import emptyBun from "../../images/burger.svg";

const BurgerConstructor: React.FC = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const burgerBun = useSelector((store: any) => store.constructorReducer.bun);
  const ingredients = useSelector(
    (store: any) => store.constructorReducer?.constructorIngredients
  );
  const orderTotal = useSelector(selectOrderTotal);
  const isUserAuth = useSelector((store: any) => store.user.user);
  const isOrderSending = useSelector((store: any) => store.order.isLoading);
  const constructorWrapperRef = useRef<HTMLDivElement | null>(null);

  const [{ handlerId }, dropRef] = useDrop(() => ({
    accept: ItemTypes.INGREDIENT,
    collect: (monitor: DropTargetMonitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    drop: (item: IIngredient) => {
      dispatch(addIngredient(item));
      dispatch(incrementCount(item._id));
      return { name: "BurgerConstructor" };
    },
  }));

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      dispatch(moveIngredient(dragIndex, hoverIndex));
    },
    [dispatch]
  );

  const handleOrderClick = () => {
    if (!isUserAuth) {
      navigate("/login");
    }
    const ingredientIds = ingredients.map((ingredient: IIngredient) => ingredient._id);
    dispatch(sendOrder(ingredientIds));
  };

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

  const isOrderButtonDisabled = !burgerBun || ingredients.length === 0;

  return (
    <section className={styles["burger-components"]}>
      <div
        ref={dropRef}
        className={styles["main-block-components"]}
        data-handler-id={handlerId}
      >
        <div className={`${styles["constructor-fixed-top"]} mt-25`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={burgerBun ? `${burgerBun.name} (верх)` : "Выберите булку"}
            price={burgerBun ? burgerBun.price : 0}
            thumbnail={burgerBun ? burgerBun.image : emptyBun}
          />
        </div>
        <div
          className={styles["constructor-wrapper"]}
          ref={constructorWrapperRef}
        >
          <div className={styles["main-constructor"]}>
            {ingredients
              .filter((ingredient: IIngredient) => ingredient.type !== "bun")
              .map((ingredient: IIngredient, index: number) => (
                <DraggableIngredient
                  key={ingredient.key}
                  index={index}
                  id={ingredient.key}
                  ingredient={ingredient}
                  moveCard={moveCard}
                />
              ))}
          </div>
        </div>
        <div className={styles["constructor-fixed-bottom"]}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={burgerBun ? `${burgerBun.name} (низ)` : "Выберите булку"}
            price={burgerBun ? burgerBun.price : 0}
            thumbnail={burgerBun ? burgerBun.image : emptyBun}
          />
        </div>
      </div>
      <div className={`${styles.total} pt-10`}>
        <div className={styles["total-price"]}>
          <Counter
            count={isNaN(orderTotal) ? 0 : orderTotal}
            size="default"
            extraClass={styles.counter}
          />
          {/* <CurrencyIcon type="primary" size="36" /> TODO fix */} 
          <CurrencyIcon type="primary" /> 
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOrderClick}
          disabled={isOrderButtonDisabled || isOrderSending}
        >
          {isOrderSending ? <Loader /> : 'Оформить заказ'}
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
