/**
 * @swagger
 * components:
 *   schemas:
 *     Show:
 *       type: object
 *       properties:
 *         showName:
 *           type: string
 *         genre:
 *           type: array
 *           items:
 *             type: string
 *         briefDescription:
 *           type: string
 *         session:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *               ticketsAvailability:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/TicketsAvailability'
 *     TicketsAvailability:
 *       type: object
 *       properties:
 *         price:
 *           type: number
 *         remain:
 *           type: number
 */

/**
 * Description:
 * This file defines the Mongoose schemas and model for managing shows information.
 * It includes schemas for tickets availability, sessions, and shows.
 * Each schema defines the structure of its respective entity and its properties. 
 * The Show model is exported to be used in other parts of the application.
 */

const mongoose = require('mongoose');

const ticketsAvailabilitySchema = new mongoose.Schema({
  price: Number,
  remain: Number
});

const sessionSchema = new mongoose.Schema({
  date: String,
  ticketsAvailability: [ticketsAvailabilitySchema]
});

const showSchema = new mongoose.Schema({
  showName: String,
  genre: [String],
  briefDescription: String,
  session: [sessionSchema]
});

const Show = mongoose.model('NowShowing', showSchema, 'nowShowing');
module.exports = Show;
