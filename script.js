function fetchCardData(cardName) {
  const url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=" + cardName;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao buscar a carta');
      }
      return response.json();
    })
    .then(data => {
      if (data.data.length > 0) {
        return data.data[0]; 
      } else {
        throw new Error('Carta não encontrada');
      }
    });
}


async function updateCardUI(carta) {
  var tabela = document.getElementById("tabelaPOKE");
  var novaLinha = tabela.insertRow(1);
  var celulaNome = novaLinha.insertCell(0);
  var celulaTipo = novaLinha.insertCell(1);
  var celulaDesc = novaLinha.insertCell(2);
  var celulaPrice = novaLinha.insertCell(3);
  var celulaFoto = novaLinha.insertCell(4);

  celulaNome.textContent = carta.name;
  celulaTipo.textContent = carta.type;
  celulaDesc.textContent = carta.desc;
  celulaPrice.textContent = carta.card_prices[0].ebay_price;
  celulaFoto.innerHTML = `<img src="https://images.ygoprodeck.com/images/cards/${carta.id}.jpg" alt="${carta.name}" width="150">`;
}


function getCard() {
  var pokeInput = document.getElementById("inputPOKE").value;

  fetchCardData(pokeInput)
    .then(carta => {
      console.log("Nome da carta:", carta.name);
      console.log("Tipo da carta:", carta.type);
      console.log("Descrição da carta:", carta.desc);
      console.log("URL da carta:", carta.ygoprodeck_url);
      console.log("Preço da carta no eBay:", carta.card_prices[0].ebay_price);

      updateCardUI(carta); 
    })
    .catch(error => {
      console.error("Erro ao consultar a carta:", error);
      alert("Erro ao consultar a carta. Por favor, verifique o nome digitado e tente novamente.");
    });
}
