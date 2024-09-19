"use client";

import { FormEvent, useState } from "react"
import { ConcentricCircles } from "./zoomable-sunburst";

export const ProjectForm = () => {
  const [name, setName] = useState<string>("demo");
  const [author, setAuthor] = useState<string>("demo");
  const [description, setDescription] = useState<string>("Demo project");
  const [github, setGithub] = useState<boolean>(false);

  const [packageManagerSelected, setPackageManagerSelected] = useState<string>();
  const [languageSelected, setLanguageSelected] = useState<string>("");
  
  const [errorMessage, setErrorMessage] = useState("");

  const packageManagerOptions = ["Yarn", "Npm"];
  const languageOptions = ["Javascript", "Typescript"];
  
  const [projectStructure, setProjectStructure] = useState<any>(null);

  function transformToHierarchy(data:any) {
    const transform = (obj:any):any => {
      return Object.keys(obj).map((key: string) => {
        const value = obj[key];
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          return {
            name: key,
            children: transform(value)
          };
        }
        return { name: key, value: 1 }; 
      });
    };
  
    return {
      name: "root",
      children: transform(data)
    };
  }

  const rawData = {
    "name": "root",
    "children": [
        {
            "name": "Domain",
            "children": []
        },
        {
            "name": "Application",
            "children": []
        },
  ]
}

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          metadata: {
            name,
            description,
            author
          },
          packageManager: packageManagerSelected?.toLowerCase(),
          language: languageSelected?.toLowerCase(),
          github
        })
      });

      if(response.ok) {
        const data = await response.json();

        console.log(data);

        setProjectStructure(transformToHierarchy(rawData));

        console.log(projectStructure)
        // const zipResponse = await fetch(data.zipFilePath);

        // if(zipResponse.ok) {
          
        // const blob = await zipResponse.blob();

        // const url = window.URL.createObjectURL(blob);
        // const a = document.createElement("a");

        // a.href = url;
        // a.download = `${name}.zip`;

        // document.body.appendChild(a);
        // a.click();
        // a.remove();
        // } else {
        //   setErrorMessage("Erro ao baixar o arquivo ZIP");
        // }
      } else {
        setErrorMessage("Erro ao criar o projeto");
      }
    } catch (error) {
      console.error("Error creating project: ", error);
      setErrorMessage("Erro ao criar o projeto");
    }
  }




  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="leading-none font-semibold">Gerenciadores de pacotes</label>
        <div className="flex gap-4">
        {packageManagerOptions.map(option =>  
          (<label key={option}>
            <input 
              className="border-b-[1px] border-y-red-400 bg-transparent shadow-none focus:outline-none focus:ring-0 text-gray-800 text-base leading-none "
              type="radio" 
              id="name" 
              value={option} 
              checked={packageManagerSelected === option}
              onChange={(e) => setPackageManagerSelected(e.target.value)} 
              required 
            />
            {option}
          </label>)
        )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="" className="leading-none font-semibold">Linguagem</label>
        <div className="flex gap-4">
        {languageOptions.map(option =>  
          (<label key={option}>
            <input 
              className="border-b-[1px] border-y-red-400 bg-transparent shadow-none focus:outline-none focus:ring-0 text-gray-800 text-base leading-none "
              type="radio" 
              id="name" 
              value={option} 
              checked={languageSelected === option}
              onChange={(e) => setLanguageSelected(e.target.value)} 
              required 
            />
            {option}
          </label>)
        )}
        </div>
      </div>

      <h1 className="font-semibold">Metadados</h1>

     <div className="flex flex-col px-4 gap-4">
      <div className="flex items-center">
        <label htmlFor="name" className="w-32 leading-none font-medium text-left">Nome</label>
        <input 
          className="w-full border-b-[1px] border-y-red-400 bg-transparent shadow-none focus:outline-none focus:ring-0 text-gray-800 text-base leading-none "
          type="text" 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value.trim())} 
          required 
        />
      </div>
      <div className="flex items-center">
        <label htmlFor="author" className="w-32 leading-none font-medium text-left">Autor</label>
        <input 
          className="w-full border-b-[1px] border-y-red-400 bg-transparent shadow-none focus:outline-none focus:ring-0 text-gray-800 text-base leading-none "
          type="text" 
          id="author" 
          value={author} 
          onChange={(e) => setAuthor(e.target.value.trim())} 
          required 
        />
      </div>
      <div className="flex items-center">
        <label htmlFor="description" className="w-32 leading-none font-medium text-left">Descrição</label>
        <input 
          className="w-full border-b-[1px] border-y-red-400 bg-transparent shadow-none focus:outline-none focus:ring-0 text-gray-800 text-base leading-none "
          type="text" 
          id="description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value.trim())} 
          required 
        />
      </div>
     
    </div>
    <div>
      <div className="flex justify-between items-center mt-4">
        <h1 className="font-semibold">Dependências</h1>
        <button className="border-2 p-2 rounded-md border-black font-semibold">
          Adicionar
        </button>
      </div>
      <p className="font-serif text-base italic">Nenhuma dependência selecionada</p>
    </div>

     <div className="flex items-center ">
        <label htmlFor="github" className="font-semibold mr-4 ">Adicionar ao GitHub </label>
        <input
          className="h-4 w-4" 
          type="checkbox" 
          id="github" 
          checked={github} 
          onChange={(e) => setGithub(e.target.checked)}/>
      </div>

    <div className="flex items-center gap-6">
      <button type="submit" className="flex-1 py-2 px-4 cursor-pointer bg-red-400 text-white rounded-md">Gerar</button>
      <button type="button" className="flex-1 py-2 px-4 cursor-pointer border-2 border-red-400 text-red-400 rounded-md">Explorar</button>
      <button type="button" className="flex-1 py-2 px-4 cursor-pointer border-2 border-red-400 text-red-400 rounded-md">Compartilhar</button>

    </div>

    {errorMessage && <p>{errorMessage}</p>}
    {projectStructure && (
        <div className="mt-4">
          <h2 className="font-semibold">Project Structure</h2>
          <ConcentricCircles />
        </div>
      )}

    <ConcentricCircles />
    </form>
  )
}