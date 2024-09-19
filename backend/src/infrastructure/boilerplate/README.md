# Projeto Gerado com Clean Architecture

Este projeto foi gerado utilizando um template que segue os princípios da Clean Architecture. A Clean Architecture é uma abordagem que visa organizar o código de maneira a garantir a separação de responsabilidades e facilitar a manutenção e escalabilidade do sistema.

## Arquitetura

A Clean Architecture organiza o código em camadas, onde cada camada tem responsabilidades bem definidas e depende apenas de camadas mais internas. As camadas principais utilizadas neste template são:

### 1. **Domain Layer**

- **Entidades (`src/domain/entities`)**: Contém as entidades de negócio, que são objetos centrais no domínio do sistema. Elas são simples classes ou estruturas que não têm dependências externas.
  - **Exemplo**: `System.ts` define uma entidade que pode representar um sistema ou componente que está sendo monitorado.

### 2. **Application Layer**

- **Casos de Uso (`src/application/use-cases`)**: Contém a lógica de negócio específica que define as regras e operações que podem ser executadas no sistema.
  - **Exemplo**: `CheckSystemHealthUseCase.ts` contém a lógica para verificar o estado de saúde de um sistema.
- **Interfaces (`src/application/interfaces`)**: Define contratos (interfaces) que descrevem as operações que outras camadas podem fornecer ou utilizar.
  - **Exemplo**: `IHttpRequest.ts`, `IHttpResponse.ts` e `ISystemHealthService.ts` são interfaces que descrevem as interações permitidas entre as camadas.

### 3. **Infrastructure Layer**

- **Configuração (`src/infrastructure/config`)**: Contém arquivos de configuração específicos para a infraestrutura, como registro de rotas e outros detalhes.
  - **Exemplo**: `register-routes.ts` é um arquivo de configuração para definir as rotas da aplicação.
- **Adaptadores e Serviços (`src/infrastructure/http`, `src/infrastructure/system-health-service.ts`)**: Contém implementações concretas de serviços ou adaptadores que interagem com sistemas externos.
  - **Exemplo**: `ExpressAdapter.ts` adapta o framework Express para ser utilizado com a arquitetura, e `SystemHealthService.ts` implementa a lógica para verificar a saúde de um sistema.

### 4. **Interface Layer**

- **Controladores (`src/interface/controllers`)**: Recebem as requisições dos usuários, chamam os casos de uso apropriados e retornam as respostas.
  - **Exemplo**: `CheckSystemHealthController.ts` controla a lógica para o endpoint de verificação de saúde do sistema.
- **Rotas (`src/interface/routes`)**: Define as rotas HTTP que estão disponíveis na API.
  - **Exemplo**: `health-routes.ts` define as rotas relacionadas ao sistema de saúde.
- **Fábricas (`src/interface/factories`)**: Responsáveis por criar instâncias de controladores ou outros objetos, configurando as dependências necessárias.
  - **Exemplo**: `CheckSystemHealthControllerFactory.ts` é responsável por criar e configurar o `CheckSystemHealthController`.

## Estrutura do Projeto

Aqui está uma visão geral da estrutura de diretórios e arquivos:

```plaintext
src/
|-- application/
|   |-- interfaces/
|   |   |-- IHttpRequest.ts
|   |   |-- IHttpResponse.ts
|   |   |-- IHttpServer.ts
|   |   |-- ISystemHealthService.ts
|   |-- use-cases/
|       |-- CheckSystemHealthUseCase.ts
|-- domain/
|   |-- entities/
|       |-- System.ts
|-- infrastructure/
|   |-- config/
|   |   |-- register-routes.ts
|   |-- http/
|   |   |-- ExpressAdapter.ts
|   |-- system-health-service.ts
|-- interface/
|   |-- controllers/
|   |   |-- CheckSystemHealthController.ts
|   |-- factories/
|   |   |-- health/
|   |       |-- CheckSystemHealthControllerFactory.ts
|   |-- routes/
|       |-- health-routes.ts
|-- app.ts
|-- package.json
|-- tsconfig.json
|-- README.md
