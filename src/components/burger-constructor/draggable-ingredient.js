import { useRef } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./draggable-ingredient.module.css";
import { useDispatch } from "react-redux";
import { removeIngredient, decrementCount } from "../../services/actions/constructor";
 
const DraggableIngredient = ({ ingredient, index, id, moveCard }) => {
  const ref = useRef(null)
  const dispatch = useDispatch();

  const [{ isDragging }, dragRef] = useDrag({
    type: "movableIngredient",
    item: () => ({ ...ingredient, index, id }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, dropRef] = useDrop({
    accept: "movableIngredient",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover: (draggedItem, monitor) => {
      if (!ref.current) {
        return
      }
      const dragIndex = draggedItem.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      
      moveCard(dragIndex, hoverIndex)
    },
  });

  dragRef(dropRef(ref))

  return (
    <div ref={ref} className={styles["constructor-item"]} style={{ opacity: isDragging ? 0 : 1 }} data-handler-id={handlerId}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => {
          dispatch(removeIngredient(ingredient.key));
          dispatch(decrementCount(ingredient._id));
        }}
      />
    </div>
  );
};

export default DraggableIngredient;
