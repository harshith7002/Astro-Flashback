import { motion } from "framer-motion";

const EventCard = ({ event }) => (
  <motion.div 
    className="p-4 border rounded-xl bg-white shadow-md hover:shadow-xl"
    initial={{ opacity: 0, y: 30 }}           // 👈 fades in and slides up
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: event.id * 0.1 }}  // 👈 stagger based on id
    whileHover={{ scale: 1.05 }}             // 👈 hover scale
  >
    <h2 className="text-lg font-semibold">{event.title}</h2>
    <p className="text-sm text-gray-600">{event.date}</p>
    <p className="mt-2">{event.description}</p>
  </motion.div>
);

export default EventCard;

