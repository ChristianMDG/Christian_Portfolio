
import AwsIcon from "../components/icons/AwsIcon";
import DockerIcon from "../components/icons/DockerIcon";
import JavaIcon from "../components/icons/JavaIcon";
import MysqlIcon from "../components/icons/MysqlIcon";
import NextIcon from "../components/icons/NextIcon";
import NodeIcon from "../components/icons/NodeIcon";
import PostGresIcon from "../components/icons/PostGres";
import PostmanIcon from "../components/icons/PostmanIcon";
import PythonIcon from "../components/icons/PythonIcon";
import ReactIcon from "../components/icons/ReactIcon";
import TailwindIcon from "../components/icons/TailwindIcon";
import TypeScriptIcon from "../components/icons/TypeScriptIcon";

import VueIcon from "../components/icons/VueIcon";
import GithubIcon from "../components/icons/GithubIcon";
import FigmaIcon from "../components/icons/FigmaIcon";
import VsCodeIcon from "../components/icons/GitIcon";
import GitIcon from "../components/icons/GitIcon";

export const techCategories = [
    {
      category: "Frontend",
      icon: "💻",
      technologies: [
        { name: "React", icon: ReactIcon, level: "Expert" },
        { name: "TypeScript", icon: TypeScriptIcon, level: "Advanced" },
        { name: "Next.js", icon: NextIcon, level: "Basic" },
        { name: "Tailwind CSS", icon: TailwindIcon, level: "Expert" },
        { name: "Vue.js", icon: VueIcon, level: "Intermediate" },
      ]
    },
    {
      category: "Backend",
      icon: "⚡",
      technologies: [
        { name: "Node.js", icon: NodeIcon, level: "Advanced" },
        { name: "Java", icon: JavaIcon, level: "Intermediate" },
        { name: "Python", icon: PythonIcon, level: "Intermediate" },
        { name: "PostgreSQL", icon: PostGresIcon, level: "Advanced" },
        { name: "MySQL", icon: MysqlIcon, level: "Intermediate" }
      ]
    },
    // {
    //   category: "Mobile",
    //   icon: "📱",
    //   technologies: [
    //     { name: "React Native", icon: "📱", level: "Advanced" },
    //     { name: "Flutter", icon: "💙", level: "Intermediate" },
    //     { name: "Expo", icon: "⚡", level: "Advanced" },
    //     { name: "Android", icon: "🤖", level: "Intermediate" }
    //   ]
    // },
    {
      category: "DevOps & Tools",
      icon: "🔧",
      technologies: [
        { name: "Docker", icon: DockerIcon, level: "Basic" },
        { name: "AWS", icon: AwsIcon, level: "Basic" },
        { name: "Gitub", icon: GithubIcon, level: "Advanced" },
        { name: "Git", icon: GitIcon, level: "Advanced" },
        { name: "Figma", icon: FigmaIcon, level: "Intermediate" },
        { name: "Postman", icon: PostmanIcon, level: "Advanced" }
      ]
    }
  ];

  export const featuredTech = [
    { name: "React", icon: ReactIcon, description: "Library UI" },
    { name: "Java", icon: JavaIcon, description: "Object-oriented programming language" },
    { name: "TypeScript", icon: TypeScriptIcon, description: "JavaScript Typed" },
    { name: "Node.js", icon: NodeIcon, description: "Runtime JS" }
  ];