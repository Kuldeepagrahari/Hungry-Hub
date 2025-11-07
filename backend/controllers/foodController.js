import foodModel from "../models/foodModel.js";
import imagekit from '../config/imagekit.js'; 

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}
const addFood = async (req, res) => {
    try {
        // --- 1. Image Upload to ImageKit ---
        if (!req.file || !req.file.buffer) {
            return res.json({ success: false, message: "No image file buffer provided" });
        }

        // Convert file buffer to Base64 string for ImageKit API
        const fileBase64 = req.file.buffer.toString('base64');
        const fileName = req.file.originalname;

        const imagekitResponse = await imagekit.upload({
            file: fileBase64,
            fileName: fileName,
            folder: '/hungry-hub-foods', // Organizes files in your ImageKit dashboard
        });

        // --- 2. Save Data to MongoDB ---
        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: imagekitResponse.url,      
            imageFileId: imagekitResponse.fileId,
        });

        await food.save();
        res.json({ success: true, message: "Food Added via ImageKit" })
        
    } catch (error) {
        console.log("ImageKit/DB Error:", error);
        res.json({ success: false, message: "Error adding food" })
    }
}

// delete food (UPDATED for ImageKit)
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (!food) {
             return res.json({ success: false, message: "Food item not found." });
        }
        
        // --- 1. Delete Image from ImageKit ---
        if (food.imageFileId) {
            await imagekit.deleteFile(food.imageFileId); // Use File ID
        }
        
        // --- 2. Delete MongoDB record ---
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Food Removed from DB and ImageKit" })

    } catch (error) {
        console.log("ImageKit Delete Error:", error);
        res.json({ success: false, message: "Error during deletion" })
    }
}
const getAllFoodItemsForAI = async () => {
    try {
        const foodItems = await foodModel.find({});

        // Use the description field for rich AI context!
        const simplifiedMenu = foodItems.map(item => ({
            name: item.name,
            //  KEY CHANGE: Using description for AI context
            rich_info: item.description, 
            category: item.category,
            price: item.price
        }));

        return simplifiedMenu;
    } catch (error) {
        console.error("Error fetching food items for AI:", error);
        throw new Error("Database error while fetching menu for AI.");
    }
};
export { listFood, addFood, removeFood, getAllFoodItemsForAI }