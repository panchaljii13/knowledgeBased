import Comment from "../modle/Commentmodle.js";
import User from "../modle/UserModle.js";
import Article from "../modle/Articlemodle.js";

// AddFeedback
export const AddFeedback = async (req, res) => {
  const { feedback, UserID, ArticleID } = req.body;

  // Validate required fields
  if (!feedback || !UserID || !ArticleID) {
      return res.status(400).json({ error: 'Comment, UserID, or ArticleID is missing.' });
  }

  try {
      // Ensure UserID and ArticleID are valid numbers (if applicable)
      if (isNaN(UserID) || isNaN(ArticleID)) {
          return res.status(400).json({ error: 'Invalid UserID or ArticleID' });
      }

      const newFeedback = await Comment.create({
          feedback,
          UserID,
          ArticleID
      });

      res.status(201).json({
          success: true,
          message: 'Feedback created successfully',
          data: newFeedback
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error adding feedback. Please try again.' });
  }
};
// UpdateFeedback
export const UpdateFeedback = async (req,res) => {
    const { FeedbackID, ...updateData } = req.body;
    try{
        const feedback = await Comment.findOne({ where: { FeedbackID } });
        if (feedback) {
            await feedback.update(updateData);
            res.status(201).json({
                success: true,
                message: 'feedback Update successfully',
                data: feedback
            });
          } else {
            res.status(404).json({ error: 'feedback not found' });
          }
        } catch (error) {
            console.log(error);
          res.status(400).json({ error: error.message });
        }
}
// DeleteFeedback
export const DeleteFeedback = async (req,res) => {
    const { FeedbackID } = req.body;
    console.log(FeedbackID)
    if (!FeedbackID) {
        return res.status(400).json({ error: 'FeedbackID is required' });
    }

    try {
        const feedback = await Comment.findOne({ where: { FeedbackID } });
        
        if (feedback) {
            await feedback.destroy(); 
            res.status(201).json({
                massage: " Delete feedback successfully....",
              });
        } else {
            res.status(404).json({ error: 'feedback not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}
// viewallFeedback
export const viewallFeedback = async (req, res) => {
    try {
      // Fetch all comments with associated User and Article
      const feedback = await Comment.findAll({
        include: [
          {
            model: User,
            as: 'user', // Alias defined in the Comment model
            attributes: ['UserID', 'name'], // Adjust as needed
          },
          {
            model: Article,
            as: 'article', // Alias defined in the Comment model
            attributes: ['ArticleID', 'title'], // Adjust as needed
          },
        ],
      });
  console.log(feedback);
      // Respond with the list of feedback
      res.status(200).json({
        success: true,
        data: feedback,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error retrieving feedback. Please try again.' });
    }
  };
export default Comment;