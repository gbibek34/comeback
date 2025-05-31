import React from 'react'

function SingleProductCard({ allProducts }) {
    return (
        <div>
            {
                allProducts.map((product) => (
                    <div key={product._id}>
                        <div>Product Title:{product.title}</div>
                        <div>Product Desc:{product.description}</div>
                        <div>Stock Available:{product.stock}</div>
                        <div>Price:${product.price}</div>
                        <div>Add To Cart</div>
                        <div>_____________________________________</div>
                    </div>
                ))
            }
        </div>
    )
}

export default SingleProductCard