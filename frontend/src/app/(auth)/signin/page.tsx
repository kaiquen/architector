"use client";

import { Button } from "@/presentation/components/ui/button";
import { Loader2 } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBitbucket, FaGithub } from "react-icons/fa";

export default function Page() {
  const {data: session, status} = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false); 
  
  useEffect(() => {
    if(status === "authenticated") {
      router.push("/")
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className='fixed inset-0 flex items-center justify-center'>        
        <Loader2 className='animate-spin duration h-8 w-8 '/>
      </div>
    )
  }

  const handlerLogin = async () => {
    setLoading(true);

    await signIn("github", {
      redirect: true,
      callbackUrl: "/",
    });
  }
  
  return (
    <main className="flex flex-col items-center justify-center -mt-32 min-h-screen">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-muted-foreground">Entre com sua conta para acessar a aplicação</p>
      </div>
      <div>
        <div className="space-y-4">
          <Button variant="outline" className="w-full" onClick={handlerLogin} disabled={loading}>
            {
              loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
              ) : (
                <>
                  <FaGithub className="h-4 w-4 mr-2" />
                  Login com GitHub
                </>
              )
            }
          </Button>
          <Button variant="outline" className="w-full" disabled>
            <FaBitbucket className="h-4 w-4 mr-2" />
            Login com Bitbucket
          </Button>
        </div>
      </div>
    </main>
  )
}