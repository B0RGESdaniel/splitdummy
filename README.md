# Splitdummy
## Plano de Teste
- [Plano de Teste - SplitDummy](https://docs.google.com/document/d/1uj8cpWXjAN9HqLvM98GBDVysH3Cvd9Q1OnGVNUWDLdo/edit?usp=sharing)

## Testes Manuais
- [Caso de Teste - Divide e Recibo](https://docs.google.com/document/d/1PCPgRfi3K1ra9vHQMc0QgeY5hNA6kfDyvbstReruuqw/edit?usp=sharing)
- [Caso de Teste - Participantes](https://docs.google.com/document/d/1XsdDrSenO5NZJawJgXfeyN9DLAv6QEY94MM6ctsx5wQ/edit?usp=sharing)

### Slide de apresentação 
- [Slide de apresentação](https://docs.google.com/presentation/d/15mq2dUdt_M3D65YkpKG6ZdjggS56-ZTGGASTHvlcRGM/edit?usp=sharing) 


## Descrição

👨💻O Splitdummy é uma aplicação web monousuário para dividir contas de bares e restaurantes com seus amigos.

👥É possível adicionar participantes, itens e depois dividir tudo por meio das **partes**.

💲No final da conta é possível ainda adicionar a taxa de serviço, que vem por padrão em 10%. Se não desejar incluir a taxa ou o estabelecimento não cobrar, basta definir o valor da taxa para 0.

🛠️Desenvolvido utilizando React, Vite, Typescript e TailwindCSS

### Partes

➗As partes permitem que os itens sejam divididos tanto por quantidade quanto apenas um item para vários particpantes.

💰O valor de cada parte equivale ao valor total do item(Quantidade x Valor unitário) dividido pela soma das partes.

Exemplo: 

Supondo que 3 pessoas compraram 2 refrigerantes que custavam 15 reais cada. 

O valor total seria 30 reais(15 reais x 2 unidades). Se cada pessoa ficasse com uma parte o valor de cada parte seria 10 reais(30 reais / 3 partes)

## Passo a passo

1. Adicionar os participantes
2. Adicionar os itens(descrição, valor unitário, quantidade)
3. Selecione um item para dividir
4. Atribua as partes para cada participante de cada item
5. Acesse a página de conta finalizada para ver o valor final de cada participante

## Telas
Pessoas             |  Itens          |  Divisão          |  Conta
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:
![People page](https://github.com/B0RGESdaniel/splitdummy/blob/main/src/assets/readme-imgs/people.png)  | ![Items page](https://github.com/B0RGESdaniel/splitdummy/blob/main/src/assets/readme-imgs/items.png) | ![Divide page](https://github.com/B0RGESdaniel/splitdummy/blob/main/src/assets/readme-imgs/divide.png) | ![Receipt page](https://github.com/B0RGESdaniel/splitdummy/blob/main/src/assets/readme-imgs/receipt.png)
