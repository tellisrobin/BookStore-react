import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import {AiOutlineEdit} from 'react-icons/ai'
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md'
import {PiBookOpenTextLight} from 'react-icons/pi'
import {BiSolidUserCircle, BiUser, BiUserCircle, BiUserVoice,BiShow} from 'react-icons/bi';
import BookModal from './BookModal';

const BooksSingleCard = ({book}) => {
    const [showModal,setShowModal] = useState(false);
  return (
    
    <div key={book._id}
    className='border-2 rounded-lg px-2 py-4 m-2 relative border-gray-500 hover:shadow-xl'>
            <h2 className='absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg'>
                    {book.publishYear}
            </h2>
            <h4 className='my-2 text-gray-100 '>
                {book._id}
            </h4>
            <div className='flex justify-start items-center gap-x-2'>
                   <PiBookOpenTextLight className='text-red-400 text-2xl'/>
                    <h2 className='my-1'>{book.title}</h2>
            </div>
            <div className='flex justify-start items-center gap-x-2'>
            <BiSolidUserCircle className='text-red-400 text-2xl'/>
                    <h2 className='my-1'>{book.author}</h2>
            </div>
            <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
           <BiShow
            className="text-3xl text-blue-500 hover:text-black"
           onClick={()=>setShowModal(true)}
           />
            <Link to={`/books/details/${book._id}`}>
                                    <BsInfoCircle className='text-2x1 text-green-700 hover:text-black' />
            </Link>
            <Link to={`/books/edit/${book._id}`}>
                                    <AiOutlineEdit className='text-2x1 text-yellow-500 hover:text-black' />
            </Link>
            <Link to={`/books/delete/${book._id}`}>
                                    <MdOutlineDelete className='text-2x1 text-red-800 hover:text-blacks'/>
            </Link>
            </div>
            {
                showModal && (
                    <BookModal book ={book} onClose={()=>setShowModal(false)}/>
                )
            }
           
    </div>
  )
}

export default BooksSingleCard