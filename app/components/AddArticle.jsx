import { useState } from "react"
import { useEffect } from "react"
import { Card, CardBody, Form, Input, Label, Button, Container } from "reactstrap"
import { loadAllCategories } from "../services/category-service"
import JoditEditor from "jodit-react"
import { useRef } from "react"
import { createPost as doCreatePost, uploadPostImage } from "../services/post-service"
import { getCurrentUserDetail } from "../auth"
import { toast } from "react-toastify"
import  axios  from "axios"
import {setModalOpen} from "./Modal";
import{ getFetchData } from "./CreateArticle"



export const handleSubmit =async(e,post) => {
    if (e) {
        e.preventDefault(); // Check if event object is defined before calling preventDefault
    }
    // e.preventDefault();
    const data = await axios.post("/create",post)
    console.log(data)
    if (data.data.success){ 
        alert(data.data.message)
    }   
}


const AddArticle = () => {

    const editor = useRef(null)
    // const [content,setContent] =useState('')

    const inputStyle = {
        width: "100%", // Adjust the width
        height: "30%", 
        padding:"2%",// Auto adjusts to content up to the max-height
        // Enables scrolling within the modal if content exceeds the height
    };

    const [formData,setFormData]=useState({
        title:"",
        category:"",
        content:"",

    })

     const handleSubmit =async(e,post) => {
        if (e) {
            e.preventDefault(); // Check if event object is defined before calling preventDefault
        }
        // e.preventDefault();
        const data = await axios.post("/create",post)
        console.log(data)
        if (data.data.success){ 
            alert(data.data.message)
        }   
    }
    


    const handleOnChange = (e) =>{
        if (e && e.target) {
            const { value, name } = e.target;
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        } else {
            // Handle the case where e or e.target is undefined
            console.error("Event or event target is undefined");
        }

    }

    const labelStyle = {
        
        padding:"2%",// Auto adjusts to content up to the max-height
        // Enables scrolling within the modal if content exceeds the height
    };

    const [image, setImage] = useState(null)

    //create post function
    const createPost = (event) => {

        event.preventDefault();

        // console.log(post)
        if (post.title.trim() === '') {
            toast.error("post  title is required !!")
            return;
        }

        if (post.content.trim() === '') {
            toast.error("post content is required !!")
            return
        }

        if (post.category === '') {
            toast.error("select some category !!")
            return;
        }


        //submit the form one server
        post['userId'] = user.id
        doCreatePost(post).then(data => {


            uploadPostImage(image,data.postId).then(data=>{
                toast.success("Image Uploaded !!")
            }).catch(error=>{
                toast.error("Error in uploading image")
                console.log(error)
            })



            toast.success("Post Created !!")
            // console.log(post)
            setPost({
                title: "",
                category: "",
                content: ""
            })
        }).catch((error) => {
            toast.error("Post not created due to some error !!")
            // console.log(error)
        })

    }

    //handling file chagne event
    const handleFileChange=(event)=>{
        console.log(event.target.files[0])
        setImage(event.target.files[0])
    }


    return (
        <div className="wrapper">
            <Card className="shadow-sm  border-0 mt-2">
                <CardBody>
                    {/* {JSON.stringify(post)} */}
                    <form onSubmit={ createPost}>
                            <div><label htmlFor="title" style={labelStyle}  className="input-bordered flex items-center gap-2">Title :</label></div>
                            <input type="text" id ="title" style= {inputStyle} className="input input-bordered flex items-center gap-2" name="title" onChange={handleOnChange}/>
                      
                            <div><label htmlFor="category" style={labelStyle}  className="input-bordered flex items-center gap-2">Category :</label></div>
                            <input type="text" id="category" style= {inputStyle} className="input input-bordered flex items-center gap-2" name="category" onChange={handleOnChange}/>

                            <div><label htmlFor="content" style={labelStyle} className="input-bordered flex items-center gap-2">News Content :</label></div>
                            {/* <Input
                                type="textarea"
                                placeholder="Enter here"
                                style={{ height: '300px' }}
                            /> */}
                            <div className="my-3">
                                <JoditEditor name="content" 
                                id="content"
                                    ref={editor}
                                    onChange={handleOnChange}
                                />
                            </div>

                            {/* file field  */}

                            <div className="mt-3">
                                <div><label  style={labelStyle}  className="input-bordered flex items-center gap-2">Select poster banner: :</label></div>
                                <input id="image" style= {inputStyle} type="file" onChange={handleFileChange} />
                            </div>

                </form>
                
                </CardBody>
            </Card>
        </div>
        
        
    
    
    );
};

export default AddArticle;