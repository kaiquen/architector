"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {  BookMarked, GitBranch, Github,  } from "lucide-react";

import { RepoWithCommitDto } from "@/data/dtos/repo-with-commit-dto";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";

type IProjectCard = {
  repo: RepoWithCommitDto;
}

export const ProjectCard:React.FC<IProjectCard> = ({repo}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`repos/?cloneUrl=${repo.cloneUrl}`);
  };

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className='flex-1 flex flex-row items-start gap-2'>
        <BookMarked className='w-6 h-6 mt-1'/>
        <div className='grid gap-1 flex-1 !m-0'>
          <CardTitle className="text-xl cursor-pointer hover:underline" onClick={handleClick}>{repo.name}</CardTitle>
          <CardDescription className="text-xs">{repo.htmlUrl}</CardDescription>
        </div>
        <Badge variant="outline">{repo.private ? "Privado" : "Público"}</Badge>
      </CardHeader>
      <CardContent className="flex flex-col justify-between flex-1">
        <div className='text-sm font-semibold line-clamp-3'>{repo.commit.message}</div>
        <div className='flex items-center gap-4 text-sm mt-2'>
          <div className='flex items-center gap-1'>
            <Github className='w-4 h-4'/>
            <span className='text-muted-foreground'>{new Date(repo.pushedAt).toLocaleString()}</span>
          </div>
          <div className='flex items-center gap-1'>
            <GitBranch className='w-4 h-4'/>
            <span className='text-muted-foreground'>{repo.defaultBranch}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}