"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var date_fns_1 = require("date-fns");
var AppointmentsRepository_1 = __importDefault(require("../repositories/AppointmentsRepository"));
var appointmentsRouter = express_1.default();
var appointmentsRepository = new AppointmentsRepository_1.default();
appointmentsRouter.get('/', function (request, response) {
    var appointments = appointmentsRepository.all();
    return response.json(appointments);
});
appointmentsRouter.post('/', function (request, response) {
    var _a = request.body, provider = _a.provider, date = _a.date;
    var parsedDate = date_fns_1.startOfHour(date_fns_1.parseISO(date));
    var findAppointmentInSameDate = appointmentsRepository.findByDate(parsedDate);
    if (findAppointmentInSameDate) {
        return response
            .status(400)
            .json({ message: 'This appointment is already booked' });
    }
    var appointment = appointmentsRepository.create({
        provider: provider,
        date: parsedDate,
    });
    return response.json(appointment);
});
exports.default = appointmentsRouter;
