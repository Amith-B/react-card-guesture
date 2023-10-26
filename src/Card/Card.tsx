import { useEffect, useState } from "react";
import { ReactComponent as Logo } from "../assets/verified.svg";
import "./Card.css";

function Card({
  imageUrl,
  title,
  description,
  price,
  onAddCart,
}: {
  imageUrl: string;
  title: string;
  description: string;
  price: number;
  onAddCart?: () => void;
}) {
  const [rotate, setRotate] = useState([0, 0]);
  const [swipeCoord, setSwipeCoord] = useState([0, 0]);
  const [mousePressed, setMousePressed] = useState(false);

  // handle event for primary input as touch
  const handleTouch = (
    e: React.TouchEvent<HTMLDivElement>,
    when: "start" | "end" | "move"
  ): void => {
    const coord: [number, number] = [
      e.changedTouches[0].clientX,
      e.changedTouches[0].clientY,
    ];

    switch (when) {
      case "start":
        setSwipeCoord(coord);
        break;
      case "move":
        const diff = [swipeCoord[1] - coord[1], coord[0] - swipeCoord[0]];
        setRotate(diff);
        break;
      case "end":
        setRotate([0, 0]);
        break;
      default:
        break;
    }
  };

  // handle event for primary input as mouse
  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    const { clientX, clientY } = e;
    const coord = [clientX, clientY];

    setMousePressed(true);
    setSwipeCoord(coord);
  };

  // handle mouse move event anywhere on screen
  useEffect(() => {
    const mouseMoveCallback = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const coord = [clientX, clientY];

      const diff = [swipeCoord[1] - coord[1], coord[0] - swipeCoord[0]];
      setRotate(diff);
    };

    if (mousePressed) {
      document.addEventListener("mousemove", mouseMoveCallback);
    }

    return () => document.removeEventListener("mousemove", mouseMoveCallback);
  }, [mousePressed, swipeCoord]);

  // handle mouse up event anywhere on screen
  useEffect(() => {
    const mouseUpCallback = () => {
      setMousePressed(false);
      setRotate([0, 0]);
    };
    document.addEventListener("mouseup", mouseUpCallback);

    return () => document.removeEventListener("mouseup", mouseUpCallback);
  }, []);

  return (
    <div
      className="card__container"
      onMouseDown={(event) => handleMouseDown(event)}
      onTouchStart={(event) => handleTouch(event, "start")}
      onTouchMove={(event) => handleTouch(event, "move")}
      onTouchEnd={(event) => handleTouch(event, "end")}
    >
      <div
        className="card"
        style={{
          transform: `rotateX(${rotate[0]}deg) rotateY(${rotate[1]}deg)`,
        }}
      >
        <div className="card__image">
          <img src={imageUrl} />
        </div>
        <section className="card__content">
          <h1 className="card__title">{title}</h1>
          <p className="card__description">{description}</p>
        </section>
        <footer>
          <div className="card__price">
            <div className="card__price-label">
              Total price{" "}
              <span className="card__price-label__verified">
                <Logo />
              </span>
            </div>
            <div className="card__price-value">
              <b>$ {price.toFixed(2)}</b>
            </div>
          </div>
          <button className="card__add-cart" onClick={onAddCart}>
            Add to cart
          </button>
        </footer>
      </div>
    </div>
  );
}

export default Card;
