"use client";

import { ProjectCard } from '@/presentation/components/project-card';
import { Header } from '@/presentation/components/header';
import { useEffect, useState } from 'react';
import { useUser } from '@/presentation/context/user-context';
import { RepoWithCommitDto } from '@/data/dtos/repo-with-commit-dto';
import { GitHubService } from '@/data/services/github-service';
import { ListUserRepositoriesUseCase } from '@/data/use-cases/list-user-repositories-use-case';
import { Loader2 } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/presentation/components/ui/pagination';

export default function Page() {
  const [repos, setRepos] = useState<RepoWithCommitDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const {user} = useUser();

  useEffect(() => {
    const fetchRepos = async () => {
      if(user?.token) {
        setLoading(true);

        const gitHubService = new GitHubService(user.token);
        const listUserRepositoriesUseCase = new ListUserRepositoriesUseCase(gitHubService)
       
        const {repos, totalPages} = await listUserRepositoriesUseCase.execute({
          page: currentPage,
          perPage: 6,
        });
                
        setRepos(repos);
        setTotalPages(totalPages);
      }
    }

    fetchRepos().finally(() => setLoading(false));
  }, [user, currentPage]);

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className="flex-1 bg-muted/40 p-4 md:p-10">
        {
          loading 
          ? (
            <div className='fixed inset-0 flex items-center justify-center'>
              <Loader2 className='animate-spin duration h-8 w-8 '/>
            </div>
          ) 
          : (
            <div>
              <div className='max-w-6xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {
                  repos.map((repo, index) => {
                    return (
                      <ProjectCard key={repo.id} repo={repo}/>
                    )
                  })
                }
              </div>

              <div className="flex justify-center mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}                
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink href="#" onClick={() => setCurrentPage(page)} isActive={page === currentPage}>
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          )
        }
      </main> 
    </div>
  );
}
