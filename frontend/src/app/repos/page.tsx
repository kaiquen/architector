"use client";

import { useUser } from "@/presentation/context/user-context";
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from "react";

import { Header } from "@/presentation/components/header";
import VirtualMentor from "@/presentation/components/virtual-mentor";
import { Loader2 } from "lucide-react";

export default function Page () {
  const [codeServerUrl, setCodeServerUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {user} = useUser();
  
  const params = useSearchParams();

  const startCodeServer = useCallback(async () => {
    const cloneUrl = params.get("cloneUrl");
    
    if (!user?.token || !cloneUrl) {
      setError("Token de autenticação ou URL do repositório ausente");
      return;
    }

    setLoading(true);
  
    try {
      const response = await fetch("http://localhost:3001/code-server", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          repoUrl: cloneUrl,
          githubToken: user.token,
          githubLogin: user.login,
        }),
      });


      if (response.ok ) {
        const data = await response.json();

        console.log("URL **************************************")
        console.log(data.url)

        
        setCodeServerUrl(data.url ?? null);
      } else {
        setError("Erro ao iniciar o code-server");
      }
    } catch (error) {
      setError("Erro ao se conectar ao servidor");
    } finally {
      setLoading(false);
    }
  }, [user, params]);

  useEffect(() => {
    const cloneUrl = params.get("cloneUrl");
    
    if (cloneUrl && !codeServerUrl && !loading) {
      startCodeServer();
    }
  }, [params, codeServerUrl, loading, startCodeServer]);

  
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <VirtualMentor/>
      <div className="flex flex-1">
        {loading ? (
          <div className="flex items-center justify-center h-full w-full">
            <Loader2 className="mr-2 h-8 w-8 animate-spin"/>
          </div>
        ) : codeServerUrl ? (
          <iframe src={codeServerUrl} width="100%" height="100%" loading="eager" />
          ) : ( <div className="flex items-center justify-center h-full">
            <p>{error || "Nenhum projeto selecionado"}</p>
          </div>)
        }
      </div>
    </div>
  );
}