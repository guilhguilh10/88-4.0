let carrinho = [];
let usuarioLogado = "";

function mudarTela(idTela) {
    let telas = document.querySelectorAll('.tela');
    for (let i = 0; i < telas.length; i++) {
        telas[i].style.display = 'none';
    }
    document.getElementById(idTela).style.display = 'block';

    if (idTela === 'carrinho') renderizarCarrinho();
}

function adicionarAoCarrinho(nome, preco, imagem) {
    carrinho.push({ nome: nome, preco: preco, img: imagem });
    document.getElementById('contador-carrinho-topo').innerText = carrinho.length;
    alert(`"${nome}" foi adicionado ao carrinho!`);
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    document.getElementById('contador-carrinho-topo').innerText = carrinho.length;
    renderizarCarrinho();
}

function renderizarCarrinho() {
    let container = document.getElementById('itens-carrinho');
    let htmlMontado = '';
    let totalGeral = 0;

    for (let i = 0; i < carrinho.length; i++) {
        let item = carrinho[i];
        totalGeral += item.preco;

        htmlMontado += `
            <div style="display: flex; align-items: center; justify-content: space-between; background: #ffffff; padding: 15px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <img src="${item.img}" style="width: 55px; height: 55px; object-fit: contain; border-radius: 6px; background: #ffffff;">
                    <div>
                        <h4 style="color: #0f172a; margin: 0 0 4px 0; font-size: 15px; font-weight: 700;">${item.nome}</h4>
                        <p style="color: #2563eb; margin: 0; font-size: 13px; font-weight: 700;">R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
                    </div>
                </div>
                <button onclick="removerDoCarrinho(${i})" title="Remover item" style="background: #dc2626; color: #ffffff; border: none; width: 32px; height: 32px; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 14px; display: flex; align-items: center; justify-content: center; transition: background 0.2s;" onmouseover="this.style.background='#b91c1c'" onmouseout="this.style.background='#dc2626'">✕</button>
            </div>
        `;
    }

    container.innerHTML = carrinho.length === 0 ? `<p style="padding: 20px; text-align: center; color: #64748b;">O seu carrinho está vazio.</p>` : htmlMontado;
    document.getElementById('total-geral-carrinho').innerText = `R$ ${totalGeral.toFixed(2).replace('.', ',')}`;
}

function iniciarCheckout() {
    if (carrinho.length === 0) return alert("O seu carrinho está vazio!");   
    if (!usuarioLogado) {
        alert("Para continuar a compra, entre na sua conta.");
        mudarTela('login');
    } else {
        mudarTela('pagamento');
    }
}

function processarLogin(event) {
    event.preventDefault();
    usuarioLogado = document.getElementById('login-usuario').value.trim();
    if (usuarioLogado) {
        document.getElementById('btn-usuario-topo').innerHTML = `👤 ${usuarioLogado}`;
        mudarTela('menu-principal');
        document.getElementById('login-usuario').value = '';
    }
}

function finalizarPedido() {
    if (carrinho.length === 0) return;
    carrinho = [];
    document.getElementById('contador-carrinho-topo').innerText = 0;
    mudarTela('sucesso');
}

document.addEventListener('DOMContentLoaded', () => mudarTela('menu-principal'));