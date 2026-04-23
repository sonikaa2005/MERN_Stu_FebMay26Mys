const showService = require("../services/show.service");

//create show : admin
exports.createShow = async (req, res, next) => {
    try {
        const show = await showService.createShow(req.body);
        res.status(201).json({ //201 for created(success)
            success: true,
            message: "Show created successfully",
            data: show,
        });
    }
    catch (error) {
        next(error);
    }
};

//Get shows
exports.getShows = async (req, res, next) => {
    try {
        const shows = await showService.getShows(req.query);
        res.status(200).json({ //200 for success
            success: true,
            message: "Shows fetched successfully",
            data: shows,
        });
    }
    catch (error) {
        next(error);
    }
};

//Get Single show

exports.getShowById = async (req, res, next) => {
    try {
        const show = await showService.getShowById(req.params.id);
        res.status(200).json({
            success: true,
            message: "Show fetched successfully",
            data: show,
        });
    }
    catch (error) {
        next(error);
    }
};
 //update show - admin
 exports.updateShow = async (req, res, next) => {
    try {
        const show = await showService.updateShow(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: "Show updated successfully",
            data: show,
        });
    }
    catch (error) {
        next(error);
    }
};

//delete show - admin (soft delete)
exports.deleteShow = async (req, res, next) => {
    try {
        const show = await showService.deleteShow(req.params.id);
        res.status(200).json({
            success: true,
            message: "Show deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};