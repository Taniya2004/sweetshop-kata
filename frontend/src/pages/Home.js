import { motion } from "framer-motion";

const sweets = [
    {
        name: "Gulab Jamun",
        img: "/images/gulabjamun.jpeg"
    },
    {
      name: "Rasgulla",
      img: "/images/rasgulla.jpeg"    
    },
    {
      name: "Kaju Katli",
      img: "/images/kajukatli.jpeg"    
    },
    {
      name: "Rasmalai",
      img: "/images/rasmalai.jpeg"
    },
];
  

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-orange-100">
      {/* Hero Section */}
      <div className="text-center py-16">
        <motion.h1
          className="text-5xl font-extrabold text-pink-600 drop-shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          🍬 Welcome to SweetShop 🍩
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Indulge in the sweetest delights of India – made with love ❤️
        </motion.p>
      </div>

      {/* Sweet Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 pb-16">
        {sweets.map((sweet, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
          >
            <img
              src={sweet.img}
              alt={sweet.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold text-gray-800">{sweet.name}</h2>
              <p className="text-pink-500 font-medium mt-2">Delicious & Fresh!</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
