import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GlassLayout from "../components/GlassLayout";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Button from "../components/Button";

const contactCards = [
  {
    title: "Email Us",
    value: "complaints@rguktong.ac.in",
    icon: Mail,
  },
  {
    title: "Call Us",
    value: "+91 8594 220 100",
    icon: Phone,
  },
  {
    title: "Visit Us",
    value: "RGUKT Ongole, AP",
    icon: MapPin,
  },
  {
    title: "Office Hours",
    value: "9AM – 5PM",
    icon: Clock,
  },
];

export default function Contact() {
  const navigate = useNavigate();

  return (
    <GlassLayout className="px-4 py-10 md:px-8">
      <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.7 }}
>
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full animate-pulse pointer-events-none" />

<div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full animate-pulse pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <p className="text-sm uppercase tracking-[0.4em] text-blue-300 mb-4">
          Get in touch
        </p>
        <h1 className="text-5xl sm:text-6xl font-bold text-white">
          Contact Us
        </h1>
        <div className="mx-auto mt-6 h-1.5 w-28 rounded-full bg-gradient-to-r from-blue-400 to-violet-500" />
        <p className="text-gray-200 max-w-2xl mx-auto mt-5 text-lg">
          Have questions about the complaint portal? Reach out to the Student Grievance Cell.
        </p>
      </motion.div>

      {/* Main Section */}
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-6 sm:grid-cols-2">
          {contactCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
               whileHover={{
  scale: 1.05,
  y: -10,
}}
                className="group min-h-[220px] rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 shadow-2xl transition-all duration-300 hover:border-blue-400/40"
                >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-500/10 text-blue-400">
                  <Icon size={24} />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">{card.title}</h2>
                <p className="text-white font-medium">{card.value}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-[2rem] border border-white/20 bg-white/5 backdrop-blur-xl shadow-2xl p-8"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-white/70 mb-2">
            Send a message
          </p>
          <h2 className="text-3xl font-bold text-white mb-3">
            Student Grievance Support
          </h2>
          <p className="text-slate-200 mb-6">
            Have questions, suggestions, or concerns?
            Our grievance team is here to help and will respond within 24–48 hours.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Full Name" name="name" className="rounded-2xl" />
            <Input label="Email" type="email" name="email" className="rounded-2xl" />
          </div>

          <Input
            label="Subject"
            name="subject"
            className="rounded-2xl mt-2"
          />
          <Textarea label="Message" name="message" className="rounded-2xl mt-2" />

          <Button
            size="lg"
            className="
              w-full
              mt-6
              py-4
              bg-gradient-to-r
              from-blue-500
              via-indigo-500
              to-purple-600
              hover:scale-105
              transition-all
              duration-300
              shadow-lg
              shadow-blue-500/30
            "
          >
            Send Message
          </Button>
        </motion.div>
      </div>

          <motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8 pt-10"
>
  <h3 className="text-2xl font-bold text-white mb-6">
    Student Grievance Cell
  </h3>

  <div className="grid md:grid-cols-3 gap-6 text-slate-200">
    <div className="flex flex-col items-center md:items-start">
      <p className="font-semibold text-white mb-1">Email</p>
      <p className="text-slate-100">complaints@rguktong.ac.in</p>
    </div>

    <div className="flex flex-col items-center md:items-start">
      <p className="font-semibold text-white mb-1">Response Time</p>
      <p className="text-slate-100">24–48 Hours</p>
    </div>

    <div className="flex flex-col items-center md:items-start">
      <p className="font-semibold text-white mb-1">Campus</p>
      <p className="text-slate-100">RGUKT Ongole</p>
    </div>
  </div>
</motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8 text-center"
      >
        <p className="text-gray-200 max-w-2xl mx-auto">
          To raise a formal campus complaint, use our dedicated portal and make sure your issue reaches the right department quickly.
        </p>

        <Button variant="glass" className="mt-6" onClick={() => navigate("/raise") }>
          Raise a Complaint
        </Button>
      </motion.div>
          </motion.div>
    </GlassLayout>
  );
}
