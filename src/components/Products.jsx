import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import Product from "./Product";


const Container = styled.div`
    padding:20px;
    display:flex;
    flex-wrap:wrap; 
    justify-content:space-between;
`;
const Products = ({ cat, filters, sort }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    //category
    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(cat ? `http://localhost:5000/api/products?category=${cat}` : "http://localhost:5000/api/products")
                setProducts(res.data)
            } catch (err) {
            }
        }
        getProducts()
    }, [cat])

    //filter
    useEffect(() => {
        cat &&
            setFilteredProducts(
                products.filter(item =>
                    Object.entries(filters).every(([key, value]) =>
                        item[key].includes(value)
                    )
                )
            )
    }, [cat, filters, products])

    //sort
    useEffect(() => {
        if (sort === "newest") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.createdAt - b.createdAt)
            );
        } else if (sort === "asc") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.price - b.price)
            );
        } else {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => b.price - a.price)
            );
        }
    }, [sort])


    //console.log(cat, filters, sort)
    return (
        <Container>
            {cat ? filteredProducts.map(item => (
                <Product item={item} key={item.id || item._id} />
            )) : products
                .slice(0, 8)
                .map(item => (
                    <Product item={item} key={item.id || item._id} />
                ))}
        </Container>
    )
}

export default Products
