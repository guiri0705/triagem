# Triagem · g.costatreinador

Página de triagem em formato de quiz (toques, sem digitar). Ao final, as respostas vão para a planilha/e-mail do treinador e o WhatsApp abre com a mensagem pronta.

## 1. Configurar
No `index.html`, bloco `CONFIG`:
- `WHATSAPP`: número com DDI+DDD, só dígitos (ex.: `5511999998888`).
- `ENDPOINT`: URL do Apps Script (passo 2). Se ficar vazio, o resumo vai dentro da mensagem do WhatsApp.

## 2. Receber as respostas (grátis)
1. Crie uma planilha no Google Sheets.
2. Extensões > Apps Script, cole o conteúdo de `apps-script.gs`.
3. Implantar > Nova implantação > App da Web, executar como você, acesso "Qualquer pessoa".
4. Copie a URL e cole em `CONFIG.ENDPOINT`.

## 3. Publicar no GitHub Pages
Settings > Pages > Deploy from branch > `main` / root. O link `https://<usuario>.github.io/<repo>/` vai na bio.
