import { DeleteRounded } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//import { productRows } from "../../dummydata";
import { deleteProduct, getProducts } from "../../redux/apiCalls";
import "./ProductList.css"

export default function ProductList() {
    //const [data, setData] = useState(productRows);

    const dispatch = useDispatch()

    const products = useSelector(state => state.product.products);

    useEffect(() => {
        getProducts(dispatch)
    }, [dispatch])

    const handleDelete = (id) => {
        //setData(data.filter((item) => item.id !== id));
        deleteProduct(id, dispatch)

    };

    const [paginationModel, setPaginationModel] = useState({ pageSize: 10, page: 0 });
    const columns = [
        {
            field: '_id',
            headerName: 'ID',
            width: 250
        },
        {
            field: 'product',
            headerName: 'Product',
            width: 325,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        <img className="productListImg" src={params.row.img} alt="" />
                        {params.row.title}
                    </div>
                );
            }
        },
        {
            field: 'inStock',
            headerName: 'Stock',
            width: 125
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 125
        },
        {
            field: 'action',
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (

                    <div className="actionContainer">
                        <Link to={"/product/" + params.row._id}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteRounded className="productListDelete" onClick={() => handleDelete(params.row._id)} />
                    </div>
                )

            }

        }
    ];
    return (

        <div className='productList'>
            <DataGrid className="productListBottom"
                rows={products}
                columns={columns}
                checkboxSelection
                getRowId={row => row._id}
                pageSizeOptions={[10]}
                paginationModel={paginationModel}
                onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
                disableSelectionOnClick
                disableRowSelectionOnClick
                rowHeight={65}//make it viewport size
            />
        </div>


    )
}
