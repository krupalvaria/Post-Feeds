const moment = require("moment");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");

const { Admin } = require("../../models/index");
const ErrorHandler = require("../../utils/ErrorHandler");
const Messages = require("../../utils/messages");
const config = require("../../config/config");

const checkUser = async (sName) => {
  const admin = await Admin.findOne({ sName });
  if (!admin) {
    throw new ErrorHandler(httpStatus.UNPROCESSABLE_ENTITY, Messages.USER_NOT_FOUND);
  }
  return admin;
};

const checkDuplicateUser = async (sName, id) => {
  const admin = await Admin.findOne({ sName, _id: { $ne: id } });
  if (admin) {
    throw new ErrorHandler(httpStatus.UNPROCESSABLE_ENTITY, Messages.EMAIL_ALREADY_EXIST);
  }
};

const checkPassword = async (password, hashPassword) => {
  const isValidPassword = await bcrypt.compare(password, hashPassword);
  if (!isValidPassword) {
    throw new ErrorHandler(httpStatus.UNPROCESSABLE_ENTITY, Messages.INVALID_PASSWORD);
  }
};

const login = async (body) => {
  const { sName } = body;
  const admin = await checkUser(sName);
  const { sPassword, ...restObject } = admin._doc;
  if (!sPassword) {
    throw new ErrorHandler(httpStatus.UNPROCESSABLE_ENTITY, `${Messages.GENERATE_PASSWORD} ${sName}`);
  }
  await checkPassword(body.sPassword, sPassword);
  return restObject;
};

const generateToken = (data, expiresAt, secret = config.jwt.secret) => {
  const payload = {
    ...data,
    iat: moment().unix(),
    exp: expiresAt
  };
  return jwt.sign(payload, secret);
};

const generateAuthTokens = async (admin) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, "minutes").unix();
  const accessToken = await generateToken(admin, accessTokenExpires);
  return accessToken;
};

const register = async (body) => {
  const { sName } = body;
  await checkDuplicateUser(sName);
  return await Admin.create(body);
};

module.exports = {
  checkUser,
  login,
  generateAuthTokens,
  register
};
