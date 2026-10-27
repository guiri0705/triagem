# Triagem · g.costatreinador

Página em formato de quiz (toques, sem digitar). A pessoa escolhe entre **fazer a triagem** ou **ir direto ao WhatsApp**. Quem faz a triagem tem nome e WhatsApp guardados numa planilha de leads assim que preenche, mesmo que desista no meio.

Site: https://guiri0705.github.io/triagem/

## 1. Configurar
No `index.html`, bloco `CONFIG`:
- `WHATSAPP`: número com DDI+DDD, só dígitos.
- `ENDPOINT`: URL do Apps Script (passo 2). Se ficar vazio, o resumo vai dentro da mensagem do WhatsApp e os leads não são guardados.

## 2. Planilha de leads (grátis)
1. Crie uma planilha no Google Sheets (ex.: "Leads Triagem").
2. Extensões > Apps Script, apague o que houver e cole o conteúdo de `apps-script.gs`.
3. Implantar > Nova implantação > tipo "App da Web", executar como você, acesso "Qualquer pessoa". Autorize quando pedir.
4. Copie a URL e cole em `CONFIG.ENDPOINT`.

Cada pessoa é uma linha, com a coluna **Status**:
- `Só contato (não concluiu)`: preencheu nome e WhatsApp, mas parou antes do fim. A coluna "Link para chamar" abre a conversa com ela.
- `Triagem completa`: terminou e foi para o WhatsApp.

Você também recebe um e-mail a cada novo lead e a cada triagem completa.
