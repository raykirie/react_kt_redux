import { useDispatch, useSelector } from "react-redux"
import { addToCartAction, decrCountAction, incrCountAction } from "../store/productReducer"
import { useEffect } from "react"

function Product(){

    const product = useSelector(store => store.product)
    const dispatch = useDispatch()

    useEffect(() => {
        localStorage.setItem('product', JSON.stringify(product))
    }, [product])


    return(
        <div>
            <button className="but" onClick={() => dispatch(addToCartAction())}><p>Add new product!</p></button>
            <div className="main">
                {product.map(elem => 
                <div className="main_product" key={elem.id}>
                    <h3>{elem.title}</h3>
                    <button onClick={() => dispatch(decrCountAction(elem.id))}>-</button>
                        <span>{elem.count}</span>
                    <button onClick={() => dispatch(incrCountAction(elem.id))}>+</button>
                </div>
                )}
            </div>
        </div>
    )
}

export default Product