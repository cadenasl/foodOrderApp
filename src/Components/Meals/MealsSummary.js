import classes from "./MealsSummary.module.css";
import { db } from "../../firebase";
import { useContext, useEffect, useState } from "react";
import cartContext from "../../store/cart-context";
const MealsSummary = () => {
  const ctx = useContext(cartContext);
  const [Name, setName] = useState();

  useEffect(() => {
    const fetchName = () => {
      const docRef = db.collection("users").doc(ctx.user.uid);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            let data = doc.data();
            setName(data.name);
            console.log("Document data:", data);
          } else {
            // doc.data() will be undefined in this case
            setName(null);
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          setName(null);
          console.log("Error getting document:", error);
        });
    };

    fetchName();
  }, []);

  console.log(Name);

  return (
    <section className={classes.summary}>
      <h1>Hi {Name} what would you like to eat today!</h1>
      <h2>Delicious Food, Delivered To You</h2>
      <p>
        Choose your favorite meal from our broad selection of available meals
        and enjoy a delicious lunch or dinner at home.
      </p>
      <p>
        All our meals are cooked with high-quality ingredients, just-in-time and
        of course by experienced chefs!
      </p>
    </section>
  );
};

export default MealsSummary;
