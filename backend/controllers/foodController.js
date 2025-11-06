import foodModel from "../models/foodModel.js";
import fs from 'fs'

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

// add food
const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category:req.body.category,
        image: image_filename,
    })
    try {
        await food.save();
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// delete food
const removeFood = async (req, res) => {
    try {

        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Food Removed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
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