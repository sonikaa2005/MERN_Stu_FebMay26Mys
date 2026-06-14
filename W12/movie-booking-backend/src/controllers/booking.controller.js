const bookingService = require("../services/booking.service");

/*
-----------------------------------------
CREATE BOOKING
-----------------------------------------
*/
exports.createBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.createBooking(
      req.user._id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Booking confirmed",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

/*
-----------------------------------------
GET MY BOOKINGS
-----------------------------------------
*/
exports.getMyBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.getUserBookings(req.user._id);

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

/*
-----------------------------------------
CANCEL BOOKING
-----------------------------------------
*/
exports.cancelBooking = async (req, res, next) => {
  try {
    await bookingService.cancelBooking(req.params.id, req.user._id);

    res.status(200).json({
      success: true,
      message: "Booking cancelled",
    });
  } catch (error) {
    next(error);
  }
};