import { DeleteRounded } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { productRows } from "../../dummydata";
import "./ProductList.css"

export default function ProductList() {
    const [data, setData] = useState(productRows);
    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    const [paginationModel, setPaginationModel] = useState({ pageSize: 10, page: 0 });
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'product',
            headerName: 'Product',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        <img className="productListImg" src={params.row.img} alt="" />
                        {params.row.name}
                    </div>
                );
            }
        },
        { field: 'Stock', headerName: 'Stock', width: 200 },
        { field: 'status', headerName: 'Status', width: 150 },
        { field: 'price', headerName: 'Price', width: 100 },
        {
            field: 'action', headerName: "Action", width: 160, renderCell:
                (params) => {
                    return (

                        <div className="actionContainer">
                            <Link to={"/product/" + params.row.id}>
                                <button className="productListEdit">Edit</button>
                            </Link>
                            <DeleteRounded className="productListDelete" onClick={() => handleDelete(params.row.id)} />
                        </div>
                    )

                }

        }
    ];
    return (

        <div className='productList'>
            <DataGrid className="productListBottom"
                rows={data}
                columns={columns}
                checkboxSelection
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
