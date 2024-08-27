
import User from '../modle/UserModle.js'
import jwt from 'jsonwebtoken';
import Article from '../modle/Articlemodle.js';
import Category from '../modle/Categorymodle.js';
// const secretKey = "secretKey";

// UserSignUp
export const UserSignUp = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body)
    try {
        const existingUser = await User.findOne({ where: { email } }); 
        if (existingUser) {
            return res.status(400).json({ error: 'Account already exists with this email.' });
        }

      
        const user = await User.create({ name, email, password });
//  jwt token
        const secretKey = "asdhfakhw2leh"
        const payload  ={email:req.body.email};
       const token= jwt.sign(payload,secretKey, {expiresIn: "2hr"})
        return res.status(200).json({message:"Sing in successfully.. ",token,user})
    } catch (err) {
        console.error( err); 
        res.status(500).json({ error: 'Error signing up. Please try again.' });
    }
};

// UserLogin
export const UserLogin = async (request, response, next) => {
    try {
        const user = await User.findOne({ where: { email: request.body.email } });
         console.log();
         
        if (!user) {
            return response.status(401).json({ Message: 'Invalid email' });
        }
        const isPasswordValid = User.checkPassword(request.body.password, user.password);
        if (isPasswordValid) {
            // const token = jwt.sign({ email: user.email, id: user.id }, 'userToken');
            return response.status(200).json({ Message: 'SignIn successfully...', user });
        }
        return response.status(401).json({ Message: 'Invalid password' });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ Error: 'Internal server error' });
    }
};



// UpdateUser
export const UpdateUser = async (req,res) => {
    const { email, ...updateData } = req.body;
    try{
        const user = await User.findOne({ where: { email } });
        if (user) {
            await user.update(updateData);
            res.status(200).json(user);
          } else {
            res.status(404).json({ error: 'User not found' });
          }
        } catch (error) {
            console.log(error);
          res.status(400).json({ error: error.message });
        }
}
// UserDelete
export const UserDelete = async (req,res) => {
    const { email } = req.body;
    console.log(email)
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const user = await User.findOne({ where: { email } });
        
        if (user) {
            await user.destroy(); 
            res.status(201).json({
                massage: " Delete Data successfully....",
              });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

// GetArticleUserByid

export const GetArticleUserByid = async (req, res) => {
    const UserID  = req.body.UserID; // Get UserID from URL parameters
    console.log(req.body)
    try {
        // Assuming Article has a foreign key reference to User and User has a foreign key reference to Category
        
        const article = await Article.findOne({
            where: { UserID }, // Find Article by UserID
            include: [
                {
                    model: User,
                    as: 'user', // Ensure this alias matches your association
                }
            ],
            include: [
                {
                    model: Category,
                    as: 'category', // Ensure this alias matches your association
                }
            ],
        });

        if (!article) {
            return res.status(404).json({ success: false, error: 'Article not found' });
        }

        res.status(200).json({
            success: true,
            data: article
        });
    } catch (error) {
        console.error('Error retrieving article:', error);
        res.status(500).json({ success: false, error: 'An error occurred while retrieving the article. Please try again.' });
    }
};

export default User;
