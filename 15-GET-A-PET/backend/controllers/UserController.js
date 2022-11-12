const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Helpers
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');


module.exports = class UserController {
  static async register(req, res) {
    const { name, email, phone, password, confirmpassword } = req.body;

    // validations
    if(!name) {
      res.status(422).json({message: 'O nome é obrigatório!'});
      return
      
    }
    
    if(!email) {
      res.status(422).json({message: 'O e-mail é obrigatório!'});
      return

    }

    if(!phone) {
      res.status(422).json({message: 'O telefone é obrigatório!'});
      return

    }
    
    if(!password) {
      res.status(422).json({message: 'O senha é obrigatório!'});
      return

    }

    if(!confirmpassword) {
      res.status(422).json({message: 'A confirmação de senha é obrigatória!'});
      return

    }

    if(password !== confirmpassword) {
      res.status(422).json({message: 'A senha e a confirmação de senha precisam ser iguais!'});
      return

    }

    // check if user exists
    const userExists = await User.findOne({ email: email});

    if(userExists) {
      res.status(422).json({message: 'Por favor, utilize outro e-mail!'});
      return

    }

    // create a password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // create a user
    const user = new User({
      name,
      email,
      phone,
      password: passwordHash,
    })


    try {
      const newUser = await user.save();
      
      await createUserToken(newUser, req, res);


    } catch(error) {
      res.status(500).json({ message: error });

    }

  }

  static async login(req, res) {
    const { email, password } = req.body;

    // validations
    if(!email) {
      res.status(422).json({message: 'O e-mail é obrigatório!'});
      return

    }

    if(!password) {
      res.status(422).json({message: 'A senha é obrigatória!'});
      return

    }

    // check if user exists
    const user = await User.findOne({ email: email});

    if(!user) {
      res.status(422).json({message: 'Não há usuários com este e-mail, tente novamente ou registre-se!'});
      return

    }

    // check if password with dbPassword
    const checkPassword = await bcrypt.compare(password, user.password);

    if(!checkPassword) {
      res.status(422).json({message: 'Senha inválida!'});
      return

    }

    await createUserToken(user, req, res);

  }

  static async checkUser(req, res) {
    let currentUser;

    if(req.headers.authorization) {
      const token = getToken(req);

      const decoded = jwt.verify(token, 'nossosecret');

      currentUser = await User.findById(decoded.id);

      currentUser.password = undefined;
      // removendo a senha do retorno

    } else {
      currentUser = null;
    }

    res.status(200).send(currentUser);

  }

  static async getUserById(req, res) {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");
    // método select() para remover alguma info q precisa ser excluida, nesse caso senha

    if(!user) {
      res.status(422).json({ message: "Usuário não encontrado!" });
      return 

    }

    res.status(200).json({ user });

  }

  static async editUser(req, res) {
    const id = req.params.id;
    const { name, email, phone, password, confirmpassword } = req.body;
    let image = '';
    const userExists = await User.findOne({ email: email });

    // check if user exists
    const token = getToken(req);
    const user = await getUserByToken(token);

    // validations
    if(!name) {
      res.status(422).json({message: 'O nome é obrigatório!'});
      return
      
    }

    user.name = name;
    
    if(!email) {
      res.status(422).json({message: 'O e-mail é obrigatório!'});
      return

    }

    // check if email already taken
    if(user.email !== email && userExists) {
      res.status(422).json({ message: 'Por favor, utilize outro e-mail!'});
      return

    }

    user.email = email;

    if(!phone) {
      res.status(422).json({message: 'O telefone é obrigatório!'});
      return

    }

    user.phone = phone;
    
    if(password !== confirmpassword) {
      res.status(422).json({message: 'A senha e a confirmação de senha precisam ser iguais!'});
      return

    } else if(password  === confirmpassword && password != null) {
      // creating password
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      user.password = passwordHash;



    }

    try {
      // return user updated data
      const updateUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true }
      )

      res.status(200).json({ message: 'Usuário atualizado com sucesso!' });



    } catch(err) {
      res.status(500).json({ message: err })
      return

    }





  }


}
