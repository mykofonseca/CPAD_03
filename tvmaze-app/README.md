# TVmaze App

Aplicativo React Native (Expo) que consome a API pública [TVmaze](https://www.tvmaze.com/api).

## Funcionalidades

- **Tela inicial:** lista as séries de `https://api.tvmaze.com/shows`, com imagem e nome.
- **Tela de detalhe:** ao tocar em uma série, mostra o nome e os episódios de `https://api.tvmaze.com/shows/{id}/episodes`, com temporada, número e nome.
- Indicador de carregamento e mensagem de erro nas duas telas.
- Séries sem imagem exibem um espaço reservado, e episódios sem número aparecem como "especial".

## Tecnologias

- React Native com Expo
- React Navigation (`@react-navigation/native-stack`)
- `FlatList`, `useState`, `useEffect` e `fetch` com `async/await`

## Como executar

Pré-requisito: Node.js instalado.

```bash
npm install
npx expo start
```

Escaneie o QR code com o app **Expo Go** no celular, ou pressione `a` (Android), `i` (iOS) ou `w` (navegador) no terminal.

## Estrutura

```
App.js                          # Stack Navigator com as duas telas
screens/
  ListaSeriesScreen.js          # listagem de séries
  DetalheSerieScreen.js         # episódios da série selecionada
```
