import React from 'react'

function SingleProductCard({ allProducts }) {
    return (
        <div>
            {
                allProducts.map((product) => (
                    <div key={product._id}>
                        <div>***************************************</div>
                        <div>Product Title:{product.title}</div>
                        <div>Product Desc:{product.description}</div>
                        <div>Stock Available:{product.stock}</div>
                        <div>Price:${product.price}</div>
                        <button>Add To Cart</button>
                        <br />
                        <button>Edit Product</button>
                        <button>Delete Product</button>
                        <div>***************************************</div>
                    </div>
                ))
            }
        </div>
    )
}

export default SingleProductCard