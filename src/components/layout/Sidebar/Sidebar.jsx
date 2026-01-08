import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-screen w-16 hidden xl:flex flex-col items-center justify-center bg-[var(--bg-color)] z-50">
      <div className="absolute top-0 h-1/3 border-l border-gray-400"></div>

      <div className="flex flex-col items-center space-y-6">
        <a
          href="https://github.com/ChristianMDG"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub className="text-gray-400 hover:text-white text-2xl transition-colors duration-300" />
        </a>
        <a
          href="https://www.linkedin.com/in/christian-ravelojaona-a934b0305/"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin className="text-gray-400 hover:text-[#0A66C2] text-2xl transition-colors duration-300" />
        </a>
        <a href="mailto:christianravelojaona@gmail.com">
          <FaEnvelope className="text-gray-400 hover:text-[#EA4335] text-2xl transition-colors duration-300" />
        </a>
      </div>
      <div className="absolute bottom-0 h-1/3 border-l border-gray-400"></div>
    </div>
  );
}