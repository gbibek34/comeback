import FormField from "../../../components/FormField"

function AddProductCard({
    categories = [],
    title,
    description,
    category,
    stock,
    price,
    image,
    handle,
    onSubmit
}) {
    return (
        <form onSubmit={onSubmit}>
            <div className="addproduct-page page">
                <div className="addproduct-card card">
                    <h1 className="title">Add Product</h1>
                    <div className="input-group">
                        <FormField
                            label="Title"
                            type="text"
                            value={title}
                            onChange={handle("title")}
                        />
                        <FormField
                            label="Description"
                            type="text"
                            value={description}
                            onChange={handle("description")}
                        />
                        <label className="input-label">Category</label>
                        <select
                            className="input-box"
                            value={category}
                            onChange={e => handle("category")(e.target.value)}
                        >
                            <option value="">...</option>
                            {categories.map(cat => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.title}
                                </option>
                            ))}
                        </select>
                        <FormField
                            label="Stock"
                            type="number"
                            value={stock}
                            onChange={handle("stock")}
                        />
                        <FormField
                            label="Price"
                            type="number"
                            value={price}
                            onChange={handle("price")}
                            step="0.01"
                        />
                        <FormField
                            label="Image"
                            type="file"
                            value={image}
                            onChange={handle("image")}
                        />
                    </div>
                    <button className="register-button button">Next</button>
                </div>
            </div>
        </form>
    )
}

export default AddProductCard