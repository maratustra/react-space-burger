import styles from "./ingredient-details.module.css";

import { IIngredient } from "../../types";

interface IngredientDetailsProps {
  ingredient: IIngredient;
}

const IngredientDetails: React.FC<IngredientDetailsProps> = ({ ingredient }) => {
  return (
    <section className={styles['ingredient-details']} data-testid="ingredient-details">
      <div className={styles['ingredient-card']}>
        <div>
          <img src={ingredient.image} alt={ingredient.name} data-testid="ingredient-image" />
        </div>

        <p data-testid="ingredient-name" className={`${styles['ingredient-name']} text text_type_main-medium mt-4 mb-8`}>
          {ingredient.name}
        </p>

        <div className={`${styles['ingredient-info']} mt-8`}>
          <div className={styles['ingredient-info-item']}>
            <span className="text text_type_main-small">Calories, kcal</span>
            <span data-testid="ingredient-calories" className="text text_type_digits-default">
              {ingredient.calories}
            </span>
          </div>
          <div className={styles['ingredient-info-item']}>
            <span className="text text_type_main-small">Proteins, g</span>
            <span data-testid="ingredient-proteins" className="text text_type_digits-default">
              {ingredient.proteins}
            </span>
          </div>
          <div className={styles['ingredient-info-item']}>
            <span className="text text_type_main-small">Fat, g</span>
            <span data-testid="ingredient-fat" className="text text_type_digits-default">
              {ingredient.fat}
            </span>
          </div>
          <div className={styles['ingredient-info-item']}>
            <span className="text text_type_main-small">Carbohydrates, g</span>
            <span data-testid="ingredient-carbohydrates" className="text text_type_digits-default">
              {ingredient.carbohydrates}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IngredientDetails;
