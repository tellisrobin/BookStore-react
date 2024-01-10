import React,{useEffect,useState} from 'react'
import axios from 'axios';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteBook = () => {
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const {id}=useParams();
  const handleDeleteBook =()=> {
    
    setLoading(true);
    axios
    .delete(`http://localhost:5555/books/${id}`)
    .then(()=>{
        setLoading(false);
        navigate('/');
    })
    .catch((error)=>{
        setLoading(false);
        console.log(error);
        alert("An error occurred");

    })
}
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3x1 my-4'>Delete Book</h1>
      {loading ? (<Spinner/>):''}
    <div className='flex flex-col items-center border-2'>
      <h2 className='text-2xl'>Delete this book?</h2>
      <button onClick={handleDeleteBook} className='bg-red-400 m-8 w-[600px] text-white'>Delete</button>
    </div>
    </div>
  )
}

export default DeleteBook