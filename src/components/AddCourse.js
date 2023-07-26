import axios from "axios";
import { Fragment, useEffect,useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import base_url from "../api/bootapi";
import { toast } from "react-toastify";

export const AddCourse = () => {
  useEffect(()=>{
    document.title='Add Course'
  },[])

  const [course,setCourse] = useState({})
  //form handler function
  const handleForm=e=>{
    console.log(course)
    postDataToServer(course)
    e.preventDefault()
  }

  //creating function to post data to server
  const postDataToServer=data=>{
    axios.post("http://localhost:5000/courses",data)
    .then((response)=>{
     console.log(response)
     console.log('success')
     toast.success('course added successfully')
     setCourse({id:'',title:'',decription:''})
    })
    .catch((error)=>{
     console.log(error)
     console.log('error')
     toast.error('Error ! Something went wrong')
    })
  }
  return (
    <Fragment>
      <h1 className="my-3">Fill Course Detail</h1>
      <Form onSubmit={handleForm}>
        <FormGroup>
          <Label for="courseId">Course Id</Label>
          <Input
            type="text"
            placeholder="Enter here"
            name="courseId"
            id="courseId"
            value={course.id}
            onChange={(e)=>setCourse({...course,id:e.target.value})}
          />
        </FormGroup>
        <FormGroup>
          <Label for="title">Course Title</Label>
          <Input type="text" placeholder="Enter title here" id="title"
          value={course.title}
          onChange={(e)=>setCourse({...course,title:e.target.value})} />
        </FormGroup>
        <FormGroup>
          <Label for="description">Course Description</Label>
          <Input
            type="textarea"
            id="description"
            placeholder="Enter description here"
            value={course.decription}
            style={{height:150}}
            onChange={(e)=>setCourse({...course,decription:e.target.value})}
          />
        </FormGroup>
        <Container>
            <Button type='submit' color="success">Add Course</Button>
            <Button type='reset' color="warning" style={{marginLeft:4}} 
            onClick={()=>setCourse({id:'',title:'',decription:''})}>Clear</Button>
        </Container>
      </Form>
    </Fragment>
  );
};
