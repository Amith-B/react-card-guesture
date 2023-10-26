import "./App.css";
import Card from "./Card/Card";
import Burger from "./assets/burger.png";

function App() {
  return (
    <div className="app">
      <Card
        imageUrl={Burger}
        title="Burger"
        description="Burger is a type of sandwich consisting of one or more than one
            patties of ground meat, placed inside sliced breads roll or bun"
        price={8}
        onAddCart={() => {
          console.log("Add to cart");
        }}
      />
    </div>
  );
}

export default App;
