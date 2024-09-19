import { FaPlus } from "react-icons/fa";

export const BtnCreateProject = () => {
    return (
        <div className="flex items-center justify-center rounded-xl p-2 border-2 border-blue-400">
            <FaPlus className="text-blue-400 w-4 h-4 mr-2" />
            <p className="text-blue-400 font-semibold">Criar projeto</p>
        </div>
    );
}