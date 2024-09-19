"use client";

import { BarChart, BoxIcon, DatabaseIcon, FolderIcon, LayersIcon, LayoutTemplateIcon, Loader2, MountainSnowIcon, Plus } from "lucide-react"

import Link from "next/link"
import Image from "next/image";
import { Button } from '@/presentation/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/presentation/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/presentation/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/presentation/components/ui/dropdown-menu';
import { Input } from '@/presentation/components/ui/input';
import { Label } from '@/presentation/components/ui/label';
import { Textarea } from '@/presentation/components/ui/textarea';
import { Ellipsis, GitBranchIcon, GithubIcon, HomeIcon } from 'lucide-react';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useUser } from "../context/user-context";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useInitials } from "../hooks/use-initials";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Bar, ResponsiveContainer } from "recharts";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export const Header  = () => {
    const {user, loading} = useUser();
    const [selectedArchitecture, setSelectedArchitecture] = useState("")

    const initials = useInitials(user?.name ?? "Sem Nome")
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleArchitectureSelect = (architecture: string) => {
        setSelectedArchitecture(architecture)
    }

    return (
        <>
            <header className="px-4 lg:px6 h-14 flex items-center bg-background shadow border-b">
                <Link href="/"  className="flex items-center justify-center" prefetch={false}>
                    <MountainSnowIcon />
                    <span className="sr-only">Acme Projects</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Button 
                        onClick={() => setIsModalOpen(true)} 
                        className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                        <Plus className="h-4 w-4 mr-2"/>
                        Criar Projeto
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                {
                                    loading 
                                    ? (<Loader2 className="mr-2 h-4 w-4 animate-spin"/>) 
                                    : (
                                        <Avatar>
                                            <AvatarImage src={user?.image!} alt="Avatar"/>
                                            <AvatarFallback>{initials}</AvatarFallback>
                                        </Avatar>
                                    )
                                }
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>Configurações</DropdownMenuItem>
                            <DropdownMenuItem>Suporte</DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem className="text-red-500 hover:text-red-500 focus:text-red-500" onClick={() => signOut({callbackUrl: "/signin", redirect: true})}>Sair</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </nav>
            </header>
            <Dialog modal={true} open={isModalOpen} onOpenChange={setIsModalOpen} >
                <DialogContent className="sm:max-w-[800px] ">
                    <DialogHeader>
                        <DialogTitle>Criar um novo projeto</DialogTitle>
                        <DialogDescription>Preencha os detalhes do seu novo projeto.</DialogDescription>
                    </DialogHeader>
                    <form className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4"> 
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nome</Label>
                                <Input id="name" placeholder="Insira o nome do projeto" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="language">Linguagem</Label>
                                <Select defaultValue="typescript">
                                    <SelectTrigger>
                                    <SelectValue placeholder="Select language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectItem value="typescript">TypeScript</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4"> 
                            <div className="grid gap-2">
                                <Label htmlFor="framework">Framework</Label>
                                <Select defaultValue="express">
                                    <SelectTrigger>
                                    <SelectValue placeholder="Select framework" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectItem value="express">Express</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="packageManager">Gerenciado de pacote</Label>
                                <Select defaultValue="npm">
                                    <SelectTrigger>
                                    <SelectValue placeholder="Select package manager" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectItem value="npm">npm</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="author">Autor</Label>
                            <Input id="author" placeholder="Insira o autor do projeto" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Descrição</Label>
                            <Textarea id="description" placeholder="Insira a descrição do projeto" className="min-h-[100px]" />
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-medium">Selecione a arquitetura</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                <Drawer modal={false} direction="right" disablePreventScroll={true} preventScrollRestoration={true}>
                                    <DrawerTrigger asChild>
                                        <Button                                     
                                            variant={selectedArchitecture === "clean" ? "default" : "outline"}
                                            onClick={() => handleArchitectureSelect("clean")}
                                        >
                                            <span>Arquitetura Limpa</span>
                                        </Button>
                                    </DrawerTrigger>
                                    <DrawerContent className="h-screen left-3/4 overflow-y-scroll">      
                                        <DrawerHeader>
                                            <DrawerTitle>Arquitetura Limpa</DrawerTitle>
                                            <DrawerDescription>Explore as camadas da Arquitetura Limpa e entenda como elas funcionam juntas para criar um aplicativo robusto e de fácil manutenção.</DrawerDescription>
                                        </DrawerHeader>   
                                        <div className="space-y-4 mx-4">
                                            <Card >
                                                <CardHeader>
                                                    <CardTitle>Camada de Domínio</CardTitle>
                                                    <CardDescription>
                                                        O núcleo do seu aplicativo, contendo a lógica de negócios e entidades.
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="grid gap-2">
                                                        <div className="flex items-center gap-2">
                                                        <FolderIcon className="h-5 w-5 text-muted-foreground" />
                                                        <span>entities</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                        <FolderIcon className="h-5 w-5 text-muted-foreground" />
                                                        <span>value-objects</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                        <FolderIcon className="h-5 w-5 text-muted-foreground" />
                                                        <span>aggregate</span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                                <CardFooter>
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button variant="outline" size="sm">
                                                                Saber mais
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            A camada de Domínio contém a lógica de negócios principal e as entidades do seu
                                                            aplicativo. Essa camada deve ser independente de qualquer tecnologia ou estrutura externa,
                                                            concentrando-se apenas no domínio do problema.
                                                        </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </CardFooter>
                                            </Card>
                                            <Card >
                                                <CardHeader>
                                                    <CardTitle>Camada de Aplicação</CardTitle>
                                                    <CardDescription>
                                                        O núcleo do seu aplicativo, contendo a lógica de negócios e entidades.
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="grid gap-2">
                                                        <div className="flex items-center gap-2">
                                                        <FolderIcon className="h-5 w-5 text-muted-foreground" />
                                                        <span>use-cases</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                        <FolderIcon className="h-5 w-5 text-muted-foreground" />
                                                        <span>services</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                        <FolderIcon className="h-5 w-5 text-muted-foreground" />
                                                        <span>command</span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                                <CardFooter>
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button variant="outline" size="sm">
                                                                Saber mais
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            A camada de aplicação, responsável por coordenar os casos de uso e tratar o fluxo de dados.
                                                        </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </CardFooter>
                                            </Card>
                                            <Card >
                                                <CardHeader>
                                                    <CardTitle>Camada de Infraestrutura</CardTitle>
                                                    <CardDescription>
                                                        A camada de infraestrutura, responsável por fornecer detalhes de implementação da camada de aplicação.
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="grid gap-2">
                                                        <div className="flex items-center gap-2">
                                                        <FolderIcon className="h-5 w-5 text-muted-foreground" />
                                                        <span>repositories</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                        <FolderIcon className="h-5 w-5 text-muted-foreground" />
                                                        <span>services</span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                                <CardFooter>
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button variant="outline" size="sm">
                                                                Saber mais
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            A camada de aplicação, responsável por coordenar os casos de uso e tratar o fluxo de dados.
                                                        </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </CardFooter>
                                            </Card>
                                            <Card >
                                                <CardHeader>
                                                    <CardTitle>Camada de Interface</CardTitle>
                                                    <CardDescription>
                                                        A camada de apresentação, responsável por renderizar a interface do usuário e lidar com as interações do usuário.
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="grid gap-2">
                                                        <div className="flex items-center gap-2">
                                                        <FolderIcon className="h-5 w-5 text-muted-foreground" />
                                                        <span>controllers</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                        <FolderIcon className="h-5 w-5 text-muted-foreground" />
                                                        <span>presentations</span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                                <CardFooter>
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button variant="outline" size="sm">
                                                                Saber mais
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            A camada de aplicação, responsável por coordenar os casos de uso e tratar o fluxo de dados.
                                                        </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </CardFooter>
                                            </Card>
                                        </div>                
                                    </DrawerContent>
                                </Drawer>
                                <Drawer modal={false} direction="right">
                                    <DrawerTrigger asChild>
                                        <Button  
                                            variant={selectedArchitecture === "hexagonal" ? "default" : "outline"}
                                            onClick={() => handleArchitectureSelect("hexagonal")}
                                            disabled
                                        >                                    
                                            <span>Arquitetura Hexagonal</span>
                                        </Button>
                                    </DrawerTrigger>    
                                </Drawer>
                            </div>
                        </div>
                    </form>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                        Cancel
                        </Button>
                        <Button type="submit">Create Project</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

