import { useState, useEffect } from 'react'
import axios from 'axios'
import SingleProductCard from '../components/SingleProductCard'
import { API_URL } from '../../../config'

export default function AllProductsPage() {
    const [allProducts, setAllProducts] = useState([''])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/product/all`
                )
                console.log(response.data.data)
                setAllProducts(response.data.data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchProducts()
    }, [])


    return (
        <div>
            <SingleProductCard allProducts={allProducts} />
        </div>
    )
}
