// MERN_Stu_FebMay26Mys\W9\D0\movie-booking-backend\src\controllers\show.controller.js
const showService = require("../services/show.service");

/*
-----------------------------------------
CREATE SHOW (ADMIN)
-----------------------------------------
*/
exports.createShow = async (req, res, next) => {
  try {
    const show = await showService.createShow(req.body);

    res.status(201).json({
      success: true,
      message: "Show created successfully",
      data: show,
    });
  } catch (error) {
    next(error);
  }
};

/*
-----------------------------------------
GET SHOWS (USER)
-----------------------------------------
*/
exports.getShows = async (req, res, next) => {
  try {
    const shows = await showService.getShows(req.query);

    res.status(200).json({
      success: true,
      data: shows,
    });
  } catch (error) {
    next(error);
  }
};

/*
-----------------------------------------
GET SINGLE SHOW
-----------------------------------------
*/
exports.getShowById = async (req, res, next) => {
  try {
    const show = await showService.getShowById(req.params.id);

    res.status(200).json({
      success: true,
      data: show,
    });
  } catch (error) {
    next(error);
  }
};

/*
-----------------------------------------
UPDATE SHOW (ADMIN)
-----------------------------------------
*/
exports.updateShow = async (req, res, next) => {
  try {
    const show = await showService.updateShow(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Show updated",
      data: show,
    });
  } catch (error) {
    next(error);
  }
};

/*
-----------------------------------------
DELETE SHOW (ADMIN)
-----------------------------------------
*/
exports.deleteShow = async (req, res, next) => {
  try {
    await showService.deleteShow(req.params.id);

    res.status(200).json({
      success: true,
      message: "Show deleted",
    });
  } catch (error) {
    next(error);
  }
};