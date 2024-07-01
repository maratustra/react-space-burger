export const fetchIngredients = () => {
  return fetch("https://norma.nomoreparties.space/api/ingredients")
    .then((res) => {
      console.log('res: ', res);

      if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        return data.data;
      } else {
        throw new Error("Данные не получены");
      }
    });
}

export const createOrder = (ingredients) => {
  return fetch("https://norma.nomoreparties.space/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        return data.order.number;
      } else {
        throw new Error("Заказ не создан");
      }
    });
};