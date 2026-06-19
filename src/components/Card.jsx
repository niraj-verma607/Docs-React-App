import { FaRegFileLines } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { motion, scale } from "motion/react";

const deleteTask = (index) => {
  const copyData = [...data];
  copyData.splice(index, 1);
  setData(copyData);
};

const Card = ({ data, reference, onDelete }) => {
  return (
    <motion.div
      drag
      dragConstraints={reference}
      whileDrag={{ scale: 1.1 }}
      dragElastic={0.2}
      dragTransition={{ bounceStiffness: 100, bounceDamping: 30 }}
      className="relative w-60 h-72 rounded-[30px] bg-zinc-900 text-white py-8 px-6 overflow-hidden shrink-0"
    >
      <FaRegFileLines />
      <p className="text-[16px] mt-5 leading-tight">{data.taskName}</p>
      <div className="footer absolute bottom-0 left-0  w-full">
        <div className="flex items-center justify-between mb-3 py-3 px-8">
          <h5>Delete</h5>
          <span
            onClick={() => {
              onDelete(data.index);
            }}
            className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
          >
            <IoIosClose size="1.5em" color="#000" />
          </span>
        </div>
        {data.priority && (
          <div
            className={`tag w-full py-4 ${
              data.priority === "High"
                ? "bg-red-500"
                : data.priority === "Medium"
                ? "bg-yellow-500"
                : "bg-green-500"
            } flex items-center justify-center`}
          >
            <h3 className="text-md">{data.priority}</h3>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Card;
