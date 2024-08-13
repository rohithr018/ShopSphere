import { DeleteRounded } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { userRows } from "../../dummydata";
import "./UserList.css"



export default function UserList() {
    const [data, setData] = useState(userRows)

    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    }

    const [paginationModel, setPaginationModel] = useState({ pageSize: 10, page: 0 });
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'user', headerName: 'User', width: 200, renderCell: (params) => {
                return (
                    <div className="userListUser">
                        <img className="userListImg" src={params.row.avatar} alt="" />
                        {params.row.username}
                    </div>
                );
            }
        },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'status', headerName: 'Status', width: 150 },
        { field: 'transaction', headerName: 'Transaction', width: 100 },
        {
            field: 'action', headerName: "Action", width: 160, renderCell:
                (params) => {
                    return (

                        <div className="actionContainer">
                            <Link to={"/user/" + params.row.id}>
                                <button className="userListEdit">Edit</button>
                            </Link>
                            <DeleteRounded className="userListDelete" onClick={() => handleDelete(params.row.id)} />
                        </div>
                    )

                }

        }
    ];
    return (
        <div className='userList'>
            <DataGrid
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
    );
}
