import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';

export  const  FolderAssistant = ({ folderName }:  {folderName: string  })=>  {
  const [showAssistant, setShowAssistant] = useState(false);

  const explanations = {
    domain: {
      title: 'Domain - Camada de Domínio',
      description: 'O domínio contém as entidades, objetos de valor e regras de negócio.',
      example: `class User {
        constructor(private readonly name: string) {}
        getName() { return this.name; }
      }`
    },
    application: {
      title: 'Application - Camada de Aplicação',
      description: 'Contém os casos de uso, que orquestram a lógica de negócio.',
      example: `class CreateUser {
        constructor(private readonly userRepository: UserRepository) {}
        execute(name: string) {
          const user = new User(name);
          this.userRepository.save(user);
        }
      }`
    },
    // Outras pastas...
  };

  const folderExplanation = explanations[folderName.toLowerCase() as keyof typeof explanations] || { 
    title: "Pasta Desconhecida",
    description: "Não há explicações disponíveis para essa pasta.",
    example: ""
  };
  return (
    <div>
      <Button onClick={() => setShowAssistant(true)}>Abrir Assistente Virtual</Button>

      <Dialog open={showAssistant} onOpenChange={setShowAssistant}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{folderExplanation.title}</DialogTitle>
            <DialogDescription>{folderExplanation.description}</DialogDescription>
          </DialogHeader>
          <pre className="mt-4 bg-muted p-4 rounded">{folderExplanation.example}</pre>
          <Button onClick={() => setShowAssistant(false)} className="mt-4">Fechar</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
