import axios from "axios";


const myApiKey = "53375208-e57c58d3edc6a90b7b7ee591a";

export async function getImagesByQuery(query) {
const params = new URLSearchParams({
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
});



    const response = await axios.get(`https://pixabay.com/api/?key=${myApiKey}&${params}`);
    return response.data;
};