import { useState } from "react";
import "./NewProduct.css";
// import {
//     getStorage,
//     ref,
//     uploadBytesResumable,
//     getDownloadURL,
// } from "firebase/storage";
//import app from "../../fireBase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function NewProduct() {
    const [inputs, setInputs] = useState({})
    //const [file, setFile] = useState({})
    const [categories, SetCategories] = useState([])
    const [color, SetColor] = useState([])
    const [size, SetSize] = useState([])
    const dispatch = useDispatch()

    const handleChange = (e) => {
        e.preventDefault()
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleCategories = (e) => {
        e.preventDefault()
        SetCategories(e.target.value.split(","))
    }
    const handleSize = (e) => {
        e.preventDefault()
        SetSize(e.target.value.split(","))
    }
    const handleColor = (e) => {
        e.preventDefault()
        SetColor(e.target.value.split(","))
    }

    const handleClick = (e) => {
        e.preventDefault();
        const product = { ...inputs, categories: categories, size: size, color: color };
        addProduct(product, dispatch);
    }

    //**UNCOMMENT FOR FIREBASE INTEGRATION**
    // const handleClick = (e) => {
    //     e.preventDefault();
    //     const fileName = new Date().getTime() + file.name;
    //     const storage = getStorage(app);
    //     const storageRef = ref(storage, fileName);
    //     const uploadTask = uploadBytesResumable(storageRef, file);
    //     uploadTask.on(
    //         "state_changed",
    //         (snapshot) => {
    //             // Observe state change events such as progress, pause, and resume
    //             // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //             const progress =
    //                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //             console.log("Upload is " + progress + "% done");
    //             switch (snapshot.state) {
    //                 case "paused":
    //                     console.log("Upload is paused");
    //                     break;
    //                 case "running":
    //                     console.log("Upload is running");
    //                     break;
    //                 default:
    //             }
    //         },
    //         (error) => {
    //             // Handle unsuccessful uploads
    //         },
    //         () => {
    //             // Handle successful uploads on complete
    //             // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //                 const product = { ...inputs, img: downloadURL, categories: categories };
    //                 addProduct(product, dispatch);
    //             });
    //         }
    //     );
    // };
    //console.log(inputs)
    //console.log(categories)
    //console.log(file)
    return (
        <div className="newProduct">
            <h1 className="addProductTitle">New Product</h1>
            <form className="addProductForm">
                {/* <div className="addProductItem">
                    <label>Image</label>
                    <input type="file" id="file" onChange={e => setFile(e.target.files[0])} />
                </div> */}
                <div className="addProductItem">
                    <label>Image</label>
                    <input name="img" type="text" placeholder="image address" onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Title</label>
                    <input name="title" type="text" placeholder="Apple Airpods" onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Description</label>
                    <input name="desc" type="text" placeholder="Description" onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Price</label>
                    <input name="price" type="number" placeholder="999" onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Categories</label>
                    <input type="text" placeholder="Mens,Womens" onChange={handleCategories} />
                </div>
                <div className="addProductItem">
                    <label>Color</label>
                    <input type="text" placeholder="blue,yello" onChange={handleColor} />
                </div>
                <div className="addProductItem">
                    <label>Size</label>
                    <input type="text" placeholder="S,M" onChange={handleSize} />
                </div>
                <div className="addProductItem">
                    <label>Stock</label>
                    <select name="inStock" onChange={handleChange}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <button onClick={handleClick} className="addProductButton">Create</button>
            </form>
        </div>
    );
}