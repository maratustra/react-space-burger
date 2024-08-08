import styles from "./ingredient-details.module.css";

import { IIngredient } from "../../types";

interface IngredientDetailsProps {
  ingredient: IIngredient;
}

const IngredientDetails: React.FC<IngredientDetailsProps> = ({ ingredient }) => {
  return (
    <section className={styles['ingredient-details']}>
      <div className={styles['ingredient-card']}>
        <div>
          <img src={ingredient.image} alt="Фото ингридиента" />
        </div>

        <p className={`${styles['ingredient-name']} text text_type_main-medium mt-4 mb-8`}>
          {ingredient.name}
        </p>

        <div className={`${styles['ingredient-info']} mt-8`}>
          <div className={styles['ingredient-info-item']}>
            <span className="text text_type_main-small">Калории,ккал</span>
            <span className="text text_type_digits-default">
              {ingredient.calories}
            </span>
          </div>
          <div className={styles['ingredient-info-item']}>
            <span className="text text_type_main-small">Белки, г</span>
            <span className="text text_type_digits-default">
              {ingredient.proteins}
            </span>
          </div>
          <div className={styles['ingredient-info-item']}>
            <span className="text text_type_main-small">Жиры, г</span>
            <span className="text text_type_digits-default">
              {ingredient.fat}
            </span>
          </div>
          <div className={styles['ingredient-info-item']}>
            <span className="text text_type_main-small">Углеводы, г</span>
            <span className="text text_type_digits-default">
              {ingredient.carbohydrates}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IngredientDetails;
