"use client";

import { LuPlus } from "react-icons/lu";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import AddArticle from "./AddArticle";
import {handleSubmit} from "./AddArticle";
import  axios  from "axios"
import "./styles/app.css"
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

interface DataItem {
    title: String;
    category:String;
    content:String;
    _id:String;
}


axios.defaults.baseURL = "http://localhost:8080/"




const CreateArticle = () => {
    const [ modalOpen,setModalOpen]= useState<boolean>(false);

    const handleClick = () => {
        handleSubmit(); 
        setModalOpen(false)
        
    };

    const[dataList,setDataList]= useState<DataItem[]>([]);

    const getFetchData = async()=>{
       
        // e.preventDefault();
        const data = await axios.get("/")
        console.log(data)
        if (data.data.success){ 
            setDataList(data.data.data)
            }
    
    }

useEffect(()=>{
    getFetchData()
},[])

const handleDelete = async(id :String) =>{
    const data = await axios.delete("/delete/"+id)

    if(data.data.success){
        getFetchData()
        alert(data.data.message)
    }
}

    return (
    <div>
        <button 
        onClick={()=> setModalOpen(true)} 
        className="btn btn-primary w-full">
            Create new Article<LuPlus />
        </button>
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {

                    dataList.map((el)=>{
                        return(
                            <tr>
                                <td>{el.title}</td>
                                <td>{el.category}</td>
                                <td>
                                    <button className="btn btn-edit" ><CiEdit /></button>
                                    <button className="btn btn-delete " onClick={()=>handleDelete(el._id)} ><MdDeleteOutline /></button>
                                    
                                </td>
                            </tr>
                        )

                    }

                    )
                }
                </tbody>
            </table>
            </div>
            
        
        <Modal modalOpen ={modalOpen} setModalOpen={setModalOpen}>
       
            <h3 className="font-bold text-lg">Add new article</h3>
            <AddArticle/>


     
        <div>
            <button onClick={handleClick} type="submit" className="btn btn-primary w-full" >
                SUBMIT
            </button>
        </div>
            
      

        </Modal>

    </div>

    

    
    );
        
};

export default CreateArticle;

//test commit
//test 22