import CountContext from "../context/countContext";
import { useContext } from "react";

const Facturador = () => {
    const {counter, setCounter} = useContext(CountContext);
  return (
    <>
        <div>Facturador</div>
        <h1>{counter}</h1>
        <button>+</button>
        <button>-</button>
    </>
  )
}

export default Facturador