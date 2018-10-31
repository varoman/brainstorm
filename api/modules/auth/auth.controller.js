import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import MESSAGE from '../../utils/messages';
import STATUS from '../../utils/status_codes';
import UserModel from '../../models/user.model';
import { JWT_SECRET } from '../../utils/secrets';


export const signUp = async (req, res) => {
  const {name, email, password} = req.body;
  const user = await UserModel.findOne({email});
  if (user)
    return (res
      .status(STATUS.BAD_REQUEST)
      .json({message: MESSAGE.NOT_UNIQUE_EMAIL})
    );
  createUser({name, email, password}, res);
};

export const signIn = async (req, res) => {
  const [email, password] = [req.sanitize(req.body.email), req.body.password];
  const user = await UserModel.findOne({email});
  const hash =  user ? user.password : '$2a$10$.iffxJuK2ndwUPle5YiZ9.qNnnkPMZQ6QF4zDcIMMv4e98nhQBGym';
  const passMatch = bcrypt.compareSync(password, hash);
  if (!user || !passMatch)
    return (res
      .status(STATUS.BAD_REQUEST)
      .json({message: MESSAGE.WRONG_CREDENTIALS})
    );
  res
    .status(STATUS.OK)
    .json({token: user.token});
};

export const checkAuthentication = (req, res) => {
  verifyJWT(req, err => {
    if (err)
      return res.status(STATUS.OK).json({message: MESSAGE.UNAUTHORIZED});
    return res.status(STATUS.OK).json({message: 'ok'});
  });
};

export const isAuthenticated = (req, res, next) => {
  verifyJWT(req, (err) => {
    if (err)
      return (res
        .status(STATUS.UNAUTHORIZED)
        .json({message: MESSAGE.UNAUTHORIZED})
      );
    next();
  });
};

export const verifyJWT = (req, callback) => {
  const authorizationToken = req.headers['authorization'] || 'notoken';
  jwt.verify(extractToken(authorizationToken), JWT_SECRET, (err, decoded) => callback(err, decoded));
};

export const detectUserByToken = async (req, res) => {
  let decoded, user;
  const token = req.headers['authorization'] || 'notoken';
  try {
    decoded = jwt.verify(extractToken(token), JWT_SECRET);
  } catch(err) {
    return (res
      .status(STATUS.UNAUTHORIZED).json({message: MESSAGE.UNAUTHORIZED}));
  }
  user =  await UserModel.findOne({email: decoded.user});
  if (!user)
    res.status(STATUS.NOT_FOUND).json({message: MESSAGE.USER_NOT_FOUND});
  return user;
};

const createUser = async (user, res) => {
  let validationErr;
  const {name, email, password} = user;
  const token = jwt.sign({user: email, role: 'customer'}, JWT_SECRET);
  const newUser = new UserModel({name, email, password, token});
  await newUser.save().catch(err => {
    res.status(STATUS.BAD_REQUEST).json(err);
    validationErr = true;
  });
  if (!validationErr)
    res
      .status(STATUS.CREATED)
      .json({token});
};

const extractToken = authorizationHeader => {
  return authorizationHeader.slice(authorizationHeader.indexOf('JWT') + 4);
};
