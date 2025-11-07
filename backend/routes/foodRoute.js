import express from 'express';
import multer from 'multer';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';

const foodRouter = express.Router();


// ----------------------------------------------------
// 1. CONFIGURE MULTER FOR MEMORY STORAGE (ImageKit Requirement)
// ----------------------------------------------------
// This stores the file as a Buffer in memory (req.file.buffer),
// which the addFood controller sends directly to ImageKit.

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });


// ----------------------------------------------------
// 2. DEFINE ROUTES (Public Access for now, using upload middleware)
// ----------------------------------------------------

// Public list is still accessible
foodRouter.get("/list", listFood);

// ImageKit Upload: Uses Memory Storage middleware
foodRouter.post("/add", upload.single('image'), addFood); 

// ImageKit Delete: Directly calls the controller to delete from the cloud
foodRouter.post("/remove", removeFood);


export default foodRouter;