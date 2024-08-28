import Article from "../modle/Articlemodle.js";
import User from "../modle/UserModle.js";
import Category from "../modle/Categorymodle.js";
import Comment from "../modle/Commentmodle.js";

export const AddArticle = async (req, res) => {
  const { title, content, UserID, CategoryID } = req.body;
  const files = req.files; // Multer should handle file uploads and populate req.files

  try {
    // Validate required fields
    if (!title || !content || !UserID || !CategoryID) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Process image file paths
    const imagePaths = files ? files.map(file => file.path) : [];

    // Create the article with image paths
    const newArticle = await Article.create({
      title,
      content,
      UserID,
      CategoryID,
      AddImages: imagePaths // Store paths in the database
    });

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Article created successfully',
      data: newArticle
    });

  } catch (err) {
    console.error('Error creating article:', err);

    // Return error response
    res.status(500).json({
      success: false,
      error: 'Error adding article. Please try again.',
      details: err.message // Provide error details for debugging
    });
  }
};

export const UpdateArticle = async (req, res) => {
  const { title, content, ArticleID, CategoryID } = req.body;

  try {
      console.log('Received data:', { title, content, ArticleID, CategoryID });
      
      const article = await Article.findByPk(ArticleID);

      console.log('Found article:', article);
      
      if (!article) {
          return res.status(404).json({ error: 'Article not found' });
      }

      article.title = title;
      article.content = content;
      article.CategoryID = CategoryID;
      await article.save();

      res.status(200).json({ success: true, data: article });
  } catch (error) {
      console.error('Error updating article:', error);
      res.status(500).json({ error: 'Error updating article' });
  }
};




export const DeleteArticle = async (req,res) => {
    const { ArticleID } = req.body;
    console.log(ArticleID)
    if (!ArticleID) {
        return res.status(400).json({ error: 'ArticleID is required' });
    }

    try {
        const article = await Article.findOne({ where: { ArticleID } });
        
        if (article) {
            await article.destroy(); 
            res.status(201).json({
                massage: " Delete Article successfully....",
              });
        } else {
            res.status(404).json({ error: 'Article not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}
// export const viewallArticle = async (req, res) => {
//     try {
//         const article = await Article.findAll();
//         res.status(200).json({
//             success: true,
//             data: article
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Error retrieving Article. Please try again.' });
//     }
// };

export const viewallArticle = async (req, res) => {
    try {
      const articles = await Article.findAll({
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['UserID', 'name'], // Adjust according to your User model
          },
          {
            model: Category,
            as: 'category',
            attributes: ['CategoryID', 'categoryname'],
          },
          {
            model: Comment,
            as: 'comments',
            attributes: ['FeedbackID', 'feedback'],
          },
        ],
      });
      res.status(200).json({
        success: true,
        data: articles
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error retrieving articles. Please try again.' });
    }
  };
