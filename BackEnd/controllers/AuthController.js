const jwt = require('jsonwebtoken');
const { Users } = require('../models'); 
const SECRET = '123456'; 

const AuthController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ where: { email } }); 
      
      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }
      
      if (password != user.password) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      const token = jwt.sign({ id: user.id }, SECRET, {
        expiresIn: '1h',
      });

      console.log(token)

      res.json({ auth: true, token });
    } catch (error) {
      res.status(401).send(error.message);
    }
  },
  register: async (req, res) => {
    // Rota complementar futura
  }
};

module.exports = AuthController;
