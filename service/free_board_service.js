const {
  FreeBoard,
  FreeReply,
  User,
  PointTotal,
  PointHistory,
  PointType,
  sequelize,
} = require("../model");

const Op = require("sequelize").Op;
const { POINT } = require("../config/config");
