// import { BtnCreateProject } from "@/presentation/components/btn-create-project";
// import { CardProject } from "@/presentation/components/card-project";
// import { Title } from "@/presentation/components/title";


// "use client";

// import { FileNavigator, FileStructure, ProjectStructure } from '@/presentation/components/file-navigator';
// import { ProjectForm } from '@/presentation/components/project-form';
// import { useSession } from 'next-auth/react';
// import dynamic from 'next/dynamic';
// import { useState } from 'react';

// const LoadingSpinner = () => {
//   return (
//     <div className="flex justify-center items-center h-full">
//       <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
//     </div>
//   );
// };

// const projectStructure: ProjectStructure = {
//   name: 'MyProject',
//   files: {
//     ".env":"key=123",
//     'index.js': "console.log('Hello World');",
//     'utils.js': "export const sum = (a, b) => a + b;",
//     'components': {
//       'home': {
//         'home.js': "import Home from 'react';\nexport default function App() { return <div>App</div>; }",
//       },
//       'homé': {
//         'home.js': "import Home from 'react';\nexport default function App() { return <div>App</div>; }",
//       },
//       'App.js': "import React from 'react';\nexport default function App() { return <div>App</div>; }",
//     },
//   },
// };


// const Editor = dynamic(() => import('@/presentation/components/editor'), {
//   ssr: false,
//   loading: () => <LoadingSpinner />,
// });
// export default function Home() {

//   const [selectedFile, setSelectedFile] = useState<string | null>(null);

//   const getFileContent = (files: FileStructure, path: string): string | null => {
//     const parts = path.split('/');
//     let current: FileStructure | string = files;
  
//     for (const part of parts) {
//       if (typeof current === 'object' && current[part]) {
//         current = current[part];
//       } else {
//         return null;
//       }
//     }
  
//     return typeof current === 'string' ? current : null;
//   };
//   const handleFileSelect = (filePath: string) => {
//     console.log('File selected:', filePath);

//     setSelectedFile(filePath);
//   };

//   const fileContent = selectedFile ? getFileContent(projectStructure.files, selectedFile) : '';

//   console.log('Content to render:', fileContent); // Adicione este log para verificar o conteúdo

//   return (
//     <main className="p-6 rounded-md shadow-md">
//       <h1>Monaco Editor in Next.js</h1>
//       <div className='flex gap-4'>
//         <div className='flex-1'>
//           <ProjectForm />
//         </div>
//         <div className='flex-1'>
//           <FileNavigator files={projectStructure.files} onSelect={handleFileSelect} />
//           {
//             selectedFile 
//             ? (<Editor initialContent={fileContent as string} />) 
//             : (<Editor initialContent="Select a file to view its content" />)
//           }
//         </div>
//       </div>
//     </main> 
//   );
// }


// export default function Projects() {
//     return (
//         <main className="w-full max-w-5xl mx-auto flex flex-col items-center ">
//             <div className="w-full p-10 flex items-center justify-between">
//                 <Title title="Meus Projetos"/>
//                 <BtnCreateProject />
//             </div>

//             <div className="p-8 flex flex-wrap gap-4">
//                 <CardProject/>
//                 <CardProject/>
//                 <CardProject/>
//             </div>
//         </main>
//     );
// }