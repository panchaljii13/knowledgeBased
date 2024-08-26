import Category from "../modle/Categorymodle.js";
export const AddCategory = async (req, res) => {
    const {  categoryname } = req.body; 
    try {
        
        // Check if the user already exists
        const existingAddCategory = await Category.findOne({ where: { categoryname } }); 
        if (existingAddCategory) {
            return res.status(400).json({ error: 'Category already exists.' });
        }


        const newcategory = await Category.create({ categoryname });


        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: newcategory
        });

    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: 'Error add Category. Please try again.' });
    }
};

export const UpdateCategory = async (req,res) => {
    const { CategoryID, ...updateData } = req.body;
    try{
        const category = await Category.findOne({ where: { CategoryID } });
        if (category) {
            await category.update(updateData);
            res.status(201).json({
                success: true,
                message: 'Category Update successfully',
                data: category
            });
          } else {
            res.status(404).json({ error: 'category not found' });
          }
        } catch (error) {
            console.log(error);
          res.status(400).json({ error: error.message });
        }
}

export const DeleteCategory = async (req,res) => {
    const { CategoryID } = req.body;
    console.log(CategoryID)
    if (!CategoryID) {
        return res.status(400).json({ error: 'CategoryID is required' });
    }

    try {
        const category = await Category.findOne({ where: { CategoryID } });
        
        if (category) {
            await category.destroy(); 
            res.status(201).json({
                massage: " Delete category successfully....",
              });
        } else {
            res.status(404).json({ error: 'category not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}
export const viewallCategory = async (req, res) => {
    try {
        // Fetch all categories from the database
        const categories = await Category.findAll();

        // Respond with the list of categories
        res.status(200).json({
            success: true,
            data: categories
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error retrieving categories. Please try again.' });
    }
};