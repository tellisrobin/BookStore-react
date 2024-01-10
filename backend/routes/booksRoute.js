import express from "express";
import { Book } from "../models/bookModel.js";
const router = express.Router();

//Route to add new book
router.post('/',async (request,response)=>{
    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({message:"Send required fields"});
        }
        let newbook = {
            title:request.body.title,
            author:request.body.author,
            publishYear:request.body.publishYear
        }

        let book= await Book.create(newbook);
        return response.status(201).send(book);


    }
    catch (error){
        console.log(error.message);
        return response.status(500).send({message:error.message});
    }
});

//Route to get all books
router.get('/',async (request,response)=>{
    try{
        
        let books= await Book.find({});
        return response.status(200).send({
            count:books.length,
            data:books
        });
    }
    catch (error){
        console.log(error.message);
        return response.status(500).send({message:error.message});
    }
});

//Route to get book by id
router.get('/:id',async (request,response)=>{
    try{
        let  { id }=request.params;
        let book= await Book.findById(id);
        return response.status(200).send(book);
    }
    catch (error){
        console.log(error.message);
        return response.status(500).send({message:error.message});
    }
});

//Route to update book
router.put('/:id',async (request,response)=>{
    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({message:"Send required fields"});
        }
        let  { id }=request.params;
        let result= await Book.findByIdAndUpdate(id,request.body);
        if(!result){
            return response.status(404).send({message:"Book not found"});
        }
        return response.status(200).send({message:"Book updated"});
    }
    catch (error){
        console.log(error.message);
        return response.status(500).send({message:error.message});
    }
});

//Route to delete book
router.delete('/:id',async (request,response)=>{
    try{
        let  { id }=request.params;
        let result= await Book.findByIdAndDelete(id,request.body);
        if(!result){
            return response.status(404).send({message:"Book not found"});
        }
        return response.status(200).send({message:"Book deleted"});
    }
    catch (error){
        console.log(error.message);
        return response.status(500).send({message:error.message});
    }
});

export default router;
