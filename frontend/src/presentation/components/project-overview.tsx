import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';

export  const  ProjectOverview = () => {
  const [showPresentation, setShowPresentation] = useState(false);

  useEffect(() => {
    const firstVisit = localStorage.getItem('firstVisit');
    if (!firstVisit) {
      setShowPresentation(true);
      localStorage.setItem('firstVisit', 'false'); // Marca que o usuário já viu a apresentação
    }
  }, []);

  return (
    <Dialog open={showPresentation} onOpenChange={setShowPresentation}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bem-vindo ao Projeto!</DialogTitle>
          <DialogDescription>
            Este projeto segue a Arquitetura Limpa. Aqui estão as principais pastas:
          </DialogDescription>
        </DialogHeader>
        <ul className="space-y-2">
          <li><strong>Domain:</strong> Responsável pelas entidades e regras de negócio.</li>
          <li><strong>Application:</strong> Contém os casos de uso e serviços da aplicação.</li>
          <li><strong>Infrastructure:</strong> Lida com o acesso a dados e integrações externas.</li>
          <li><strong>Interface:</strong> Cuida das interfaces de comunicação, como APIs e interface de usuário.</li>
        </ul>
        <Button onClick={() => setShowPresentation(false)} className="mt-4">Fechar</Button>
      </DialogContent>
    </Dialog>
  );
}
