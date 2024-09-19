import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import Editor from "@monaco-editor/react"; // Importando o Monaco Editor para exemplos de código
import { Button } from './ui/button';
import { LightbulbIcon } from 'lucide-react';

interface MentorStep {
  title: string;
  description: string;
  codeExample?: string; // Exemplo de código opcional
}

const mentorSteps: MentorStep[] = [
  {
    title: 'Domínio - O Coração da Arquitetura',
    description: 'A camada de domínio contém as entidades e objetos de valor, além das regras de negócio.',
    codeExample: `class User {
      constructor(private readonly name: string) {}
      
      getName(): string {
        return this.name;
      }
    }`,
  },
  {
    title: 'Aplicação - Casos de Uso',
    description: 'A camada de aplicação coordena as regras de negócio, orquestrando o domínio através dos casos de uso.',
    codeExample: `class CreateUser {
      constructor(private readonly userRepository: UserRepository) {}

      execute(name: string): void {
        const user = new User(name);
        this.userRepository.save(user);
      }
    }`,
  },
  {
    title: 'Interface - Comunicação Externa',
    description: 'A camada de interface lida com APIs e interações externas, como UI ou requisições HTTP.',
  },
];

export default function VirtualMentor() {
  const [currentStep, setCurrentStep] = useState(0); // Controla qual passo o mentor está mostrando
  const [showMentor, setShowMentor] = useState(false);

  const nextStep = () => {
    if (currentStep < mentorSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = mentorSteps[currentStep];

  return (
    <div>
        <button onClick={() => setShowMentor(true)}>
        <LightbulbIcon className="w-6 h-6 text-yellow-500 cursor-pointer" />
      </button>
      <Dialog open={showMentor} onOpenChange={setShowMentor}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{step.title}</DialogTitle>
            <DialogDescription>{step.description}</DialogDescription>
          </DialogHeader>
          {step.codeExample && (
            <div className="mt-4">
              <Editor
                height="200px"
                defaultLanguage="typescript"
                value={step.codeExample}
                theme="vs-dark"
                options={{ readOnly: true }}
              />
            </div>
          )}
          <div className="mt-4 flex justify-between">
            <Button onClick={prevStep} disabled={currentStep === 0}>
              Anterior
            </Button>
            <Button onClick={nextStep} disabled={currentStep === mentorSteps.length - 1}>
              Próximo
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
