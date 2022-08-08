let $ = document.querySelector.bind(document);
class Produto {
  constructor() {
    this.id = 1;
    this.arrayProdutos = [];
    this.editId = null;
  }
  salvar() {
    let produto = this.lerDados();
    if (this.validaCampo(produto)) {
      if (this.editId == null) {
        this.adicionar(produto);
      } else {
        this.atualizar(this.editId, produto);
      }
    }
    this.listaTabela();
    this.cancelar();
  }
  lerDados() {
    const produto = {};
    produto.id = this.id;
    produto.nomeProduto = $("#produto").value;
    produto.preco = $("#preco").value;
    return produto;
  }
  adicionar(produto) {
    produto.preco = +produto.preco;
    this.arrayProdutos.push(produto);
    this.id++;
  }
  atualizar(id, produto) {
    this.arrayProdutos.forEach((item) => {
      if (item.id == id) {
        item.nomeProduto = produto.nomeProduto;
        item.preco = produto.preco;
      }
    });
  }

  listaTabela() {
    let tbody = $(".tbody");
    tbody.innerHTML = "";

    for (let cont in this.arrayProdutos) {
      tbody.innerHTML += `<tr>
      <td class='center'>${this.arrayProdutos[cont].id}</td>
       <td class='center'>${this.arrayProdutos[cont].nomeProduto}</td>
        <td class='center'>${this.arrayProdutos[cont].preco}</td>
        <td class='flex'>
        <img src='img/icons8-edit-30.png' onclick='produto.editar(${JSON.stringify(
          this.arrayProdutos[cont]
        )})'>
        <img src='img/download.png' onclick='produto.deletar(${
          this.arrayProdutos[cont].id
        })'>
        </td>
      </tr>`;
      console.log(this.arrayProdutos);
    }
  }
  cancelar() {
    $("#produto").value = "";
    $("#produto").focus();
    $("#preco").value = "";
    $("#atualizar").innerHTML = "Salvar";
    this.editId = null;
  }

  editar(dados) {
    this.editId = dados.id;
    $("#produto").value = dados.nomeProduto;
    $("#preco").value = dados.preco;
    $("#atualizar").innerHTML = "Atualizar";
  }
  deletar(id) {
    let tbody = $(".tbody");
    if (confirm(`Desejas realmente excluir o item ${id} da sua lista.?`)) {
      this.arrayProdutos.forEach((item, index, array) => {
        if (item.id == id) {
          array.splice(index, 1);
          tbody.deleteRow(index);
        }
      });
    }

    console.log(this.arrayProdutos);
  }
  validaCampo(produto) {
    let msg = "";

    if (produto.nomeProduto == "") {
      msg += "Informe o nome do produto \n";
    }
    if (produto.preco == "") {
      msg += "Informe o preço do produto \n";
    }
    if (msg != "") {
      alert(msg);
      return false;
    }
    return true;
  }
}
const produto = new Produto();
