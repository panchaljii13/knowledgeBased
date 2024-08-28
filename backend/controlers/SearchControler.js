// import User from "../modle/UserModle.js";
import Article from "../modle/Articlemodle.js";
import { Op } from 'sequelize';


// AddFeedback
export const SearchAll = async (req, res) => {
    const { query } = req.query; // Get search query from request
    console.log(query);

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        // Search for articles that contain the query in title or content
        const results = await Article.findAll({
            where: {
                [Op.or]: [
                    {
                        title: {
                            [Op.like]: `%${query}%`
                        }
                    },
                    {
                        content: {
                            [Op.like]: `%${query}%`
                        }
                    }
                ]
            }
        });

        res.status(200).json({
            success: true,
            data: results
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error searching articles. Please try again.' });
    }
};


export default Article;