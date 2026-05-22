# 🌌 Roberto Marins — Personal Portfolio & Resume

Este repositório contém o código-fonte do meu portfólio pessoal e currículo profissional. A aplicação foi construída com foco em alta performance, interações fluidas, responsividade e práticas modernas de segurança.

🔗 **Acesse o site ao vivo:** [robertomarins.dev](https://robertomarins.dev)

---

## 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido utilizando tecnologias de ponta do ecossistema JavaScript/TypeScript:

*   **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) — Otimização de páginas, SSR dinâmico e API routes.
*   **Linguagem:** [TypeScript](https://www.typescriptlang.org/) — Tipagem estática para maior robustez e controle de erros.
*   **Estilização:** [Tailwind CSS](https://tailwindcss.com/) — Utilidades responsivas e consistência visual moderna.
*   **Animações:** [Framer Motion](https://www.framer.com/motion/) — Micro-interações orgânicas e transições baseadas em física de mola (Spring).
*   **Ícones:** [Lucide React](https://lucide.dev/) e FontAwesome.
*   **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/) (via `pg` pool) — Armazenamento seguro de contatos.

---

## 🚀 Otimizações & Funcionalidades de Destaque

Como parte de uma auditoria técnica de nível **Staff**, foram aplicadas diversas otimizações de performance e segurança:

### ⚡ Performance (Velocidade da Luz)
*   **Carregamento Dinâmico (Lazy Loading):** As seções abaixo da dobra (`Portfolio`, `Habilidades`, `Contatos` e `Footer`) são importadas assintoticamente com `next/dynamic` (com `ssr: true` para preservar a indexação de SEO), reduzindo significativamente o pacote JS inicial.
*   **Ativos de Imagem em WebP:** Todas as mídias da aplicação foram convertidas para formato `.webp` de última geração, diminuindo drasticamente o consumo de banda e o tempo de carregamento da página.
*   **Transições Estáveis na GPU:** Micro-animações de zoom e hover (como as dos cards de projetos e habilidades) foram isoladas nas propriedades de transform do Framer Motion e renderizadas diretamente via GPU, eliminando qualquer tipo de trepidação ou re-renderização (layout shifts) do grid.
*   **Cards de Habilidades Estáticos:** Definição de alturas responsivas fixas para os cards, garantindo que o posicionamento não se mova ou empurre os itens ao redor durante interações.

### 🛡️ Segurança (OWASP Standards)
*   **Proteção Honeypot Anti-Spam:** O formulário de contato inclui um campo invisível para humanos (`website`). Robôs automatizados preenchem todos os campos cegamente. Se a API de submissão detectar qualquer preenchimento neste campo, ela interrompe o fluxo imediatamente, simulando sucesso fictício para o bot sem onerar o banco de dados.
*   **Cabeçalhos de Segurança HTTP:** Configuração de diretivas essenciais no `next.config.ts` para mitigar ataques comuns:
    *   `X-Frame-Options: DENY` (Prevenção de Clickjacking)
    *   `X-Content-Type-Options: nosniff` (Prevenção de MIME sniffing)
    *   `Referrer-Policy: strict-origin-when-cross-origin` (Privacidade em referenciadores)
    *   `Permissions-Policy` (Bloqueio preventivo de acessos a hardware desnecessários, como câmera e microfone)

---

## 📂 Estrutura de Diretórios

```text
├── public/                 # Imagens otimizadas (.webp) e currículo para download
├── src/
│   ├── app/                # Rotas da aplicação (Home, Currículo e rotas de API)
│   │   ├── api/            # API Route de submissão do formulário de contato
│   │   └── curriculo/      # Página de visualização do currículo profissional
│   └── components/         # Componentes React reutilizáveis (Header, Seções, etc.)
├── package.json            # Scripts de build, start, dev e dependências do projeto
├── next.config.ts          # Configurações do compilador Next.js e headers HTTP
└── tsconfig.json           # Configurações de compilação do TypeScript
```

---

## 💻 Como Executar Localmente

Siga os passos abaixo para configurar e executar o projeto em sua máquina:

1. Clone o repositório:
   ```bash
   git clone https://github.com/robertofmarins/portifolio.git
   cd portifolio
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env.local` na raiz do projeto e configure as credenciais do banco PostgreSQL:
   ```env
   DB_USER=seu_usuario
   DB_HOST=seu_host_do_banco
   DB_NAME=seu_nome_do_banco
   DB_PASSWORD=sua_senha
   DB_PORT=5432
   ```

4. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador para visualizar.

5. Compile para produção:
   ```bash
   npm run build
   ```

---

## 📬 Contato & Redes

*   **E-mail:** contato@robertomarins.dev
*   **LinkedIn:** [in/robertofmarins](https://linkedin.com/in/robertofmarins)
*   **GitHub:** [@robertofmarins](https://github.com/robertofmarins)
