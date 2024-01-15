import React,{useEffect,useState} from 'react'
import axios from 'axios';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  
  const [title,setTitle]=useState('');
  const [author,setAuthor]=useState('');
  const [publishYear,setPublishYear]=useState('');
  const [loading,setLoading]=useState(false);
  const navigate= useNavigate();
  const { enqueueSnackbar } = useSnackbar(); 
  const {id} = useParams();
  useEffect(() =>{
      setLoading(true);
      axios
        .get(`http://localhost:5555/books/${id}`)
        .then((response)=>{
          setAuthor(response.data.author);
          setTitle(response.data.title);
          setPublishYear(response.data.publishYear);
          setLoading(false);
          
        })
        .catch((error)=>{
          setLoading(false);
          alert("An error Occured");
          console.log(error);
        })
  },[]
  )

  const handleEditbook =()=> {
      const data ={
          title,
          author,
          publishYear
      }
      setLoading(true);
      axios
      .put(`http://localhost:5555/books/${id}`,data)
      .then(()=>{
          setLoading(false);
          navigate('/');
          enqueueSnackbar('Book Edited',{variant:'success'});
      })
      .catch((error)=>{
          setLoading(false);
          console.log(error);
          enqueueSnackbar('Error',{variant:'error'});
          //alert("An error occurred");

      })
  }
  return (
    <div className='p-4'> 
      <BackButton />
      <h1 className='text-3x1 my-4'>Edit Book</h1>
      {loading ?(
        <Spinner />
      ):''}
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
          <div  className='my-4'>
              <label className='text-x1 mr-4 text-gray-500'>Title</label>
              <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} 
              className='border-2 border-gray-600 px-4 py-2 w-full' >
              </input>
          </div>
          <div  className='my-4'>
              <label className='text-x1 mr-4 text-gray-500'>Author</label>
              <input type="text" value={author} onChange={(e)=>setAuthor(e.target.value)} 
              className='border-2 border-gray-600 px-4 py-2 w-full' >
              </input>
          </div>
          <div  className='my-4'>
              <label className='text-x1 mr-4 text-gray-500'>Publisher</label>
              <input type="text" value={publishYear} onChange={(e)=>setPublishYear(e.target.value)} 
              className='border-2 border-gray-600 px-4 py-2 w-full' >
              </input>
          </div>
          <button className='p-2 m-8 bg-sky-300' onClick={handleEditbook}>
            Submit
          </button>
        </div>
    </div>
  )
}

export default EditBook