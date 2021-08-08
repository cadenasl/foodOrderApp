import classes from "./AvaliableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

function AvaliableMeals() {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrderItems = async () => {
    try {
      const response = await fetch(
        "https://food-app-c6810-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      console.log(data);

      const dataMeals = [];

      for (const id in data) {
        dataMeals.push({
          name: data[id].name,
          description: data[id].description,
          price: data[id].price,
          id: id,
        });
      }

      setMeals(dataMeals);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
    console.log(error);
    console.log(meals);
  };

  useEffect(() => {
    fetchOrderItems();
  }, []);
  if (error) {
    return (
      <section className={classes.mealsError}>
        <p>{error}</p>
      </section>
    );
  }
  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>loading...</p>
      </section>
    );
  }

  const Currentmeals = meals.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });
  return (
    <section className={classes.meals}>
      {isLoading ? <p>items are loading</p> : null}
      <Card>{Currentmeals}</Card>
    </section>
  );
}

export default AvaliableMeals;
