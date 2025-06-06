import axios from 'axios';
import { useState, useEffect } from 'react';
import { API_URL } from '../../../config';
import { useNavigate } from 'react-router-dom';
import AddProductCard from '../../products/components/AddProductCard'

function AdminDashPage() {
    // const token = localStorage.getItem('token')
    const [categories, setCategories] = useState([])
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        stock: 0,
        price: 0,
        image: "",
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API_URL}/category/`)
                // console.log(response.data.data)
                setCategories(response.data.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchCategories()
    }, [])


    const navigate = useNavigate();

    const handle = (key) => (val) =>
        setFormData((prevForm) => ({ ...prevForm, [key]: val }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${API_URL}/product/add`,
                formData
            );
            console.log(response.data);
            alert("Product Added!!");
            navigate("/products");
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <AddProductCard
                categories={categories}
                title={formData.firstName}
                description={formData.lastName}
                category={formData.email}
                stock={formData.password}
                price={formData.confirmPassword}
                image={formData.phone}
                handle={handle}
                onSubmit={handleSubmit} />
        </div>
    )
}

export default AdminDashPage