import axios from "axios";
import { Product } from "../models/Product";

const BASE_URL = 'https://fakestoreapi.com';

export const getProducts = async (): Promise<Product[]> => {
    const response = await axios.get<Product[]>(`${BASE_URL}/products`);
    console.log("Fetched Data:", response.data);
    
    return response.data;
};