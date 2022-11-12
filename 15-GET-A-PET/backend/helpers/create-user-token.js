const jwt = require('jsonwebtoken');

const createUserToken = async(user, req, res) => {
  // create a token
  const token = jwt.sign({
    name: user.name,
    id: user._id
  }, "nossosecret")
//   ^^ em sistemas complexos o secret irá fortificar o jwt e precisa ser algo complexo
//    ^^ e isso deixara o codigo mais seguro

  // return token
  res.status(200).json({ 
    message: "Você está autenticado!",
    token: token,
    userId: user._id
    // ^o userId já está dentro do token, mas tbem é possivel envialo pelo json
  })



}

module.exports = createUserToken;
