import { useRef } from 'react';
import { useDrag, useDrop, DragSourceMonitor, DropTargetMonitor } from "react-dnd";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./draggable-ingredient.module.css";
import { useDispatch } from "react-redux";
import { removeIngredient, decrementCount } from "../../services/actions/constructor";
import { IIngredient, ItemTypes } from "../../types";
import { AppDispatch } from "../../services/store";

interface DraggableIngredientProps {
  ingredient: IIngredient;
  index: number;
  id: string;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface DraggedItem {
  index: number;
  id: string;
}
 
const DraggableIngredient: React.FC<DraggableIngredientProps> = ({ ingredient, index, id, moveCard }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const [{ isDragging }, dragRef] = useDrag<DraggedItem, void, { isDragging: boolean }>({
    type: ItemTypes.MOVABLEINGREDIENT,
    item: () => ({ ...ingredient, index, id }),
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, dropRef] = useDrop<DraggedItem, void, { handlerId: string | symbol | null }>({
    accept: ItemTypes.MOVABLEINGREDIENT,
    collect(monitor: DropTargetMonitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover: (draggedItem: DraggedItem, monitor: DropTargetMonitor) => {
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
      if (!clientOffset) {
        return;
      }
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
      
      moveCard(dragIndex, hoverIndex);
      draggedItem.index = hoverIndex;
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
