import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class Criarproduto extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produto: {
                nomeProduto: "",
                descricaoProduto:"",
                preco: "",
                quantidadeEstoque:"",
                datadeCompra: "",
                ativo: "true"
            },
            erro: null,
            redirect: false
        };
    }
 
    exibeErro() {
        const { erro } = this.state;
 
        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    }
 
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/produtos" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Criar Produto</legend>
                        <div className="produto-insert">
                            <label htmlFor="nomeProduto">Nome </label>
                            <br />
                            <input
                                type="text"
                                id="nomeProduto"
                                name="nomeProduto"
                                placeholder="Nome do Produto"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.produto.nomeProduto}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-insert">
                            <label htmlFor="descricaoProduto">Descricão do Produto </label>
                            <br />
                            <input
                                type="text"
                                id="descricaoProduto"
                                name="descricaoProduto"
                                placeholder="Descricão do Produto"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.produto.descricaoProduto}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-insert">
                            <label htmlFor="preco">Preço </label>
                            <br />
                            <input
                                type="text"
                                id="preco"
                                name="preco"
                                placeholder="Preço"
                                required
                                value={this.state.produto.preco}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-insert">
                            <label htmlFor="quantidadeEstoque">Qtd em Estoque  </label>
                            <br />
                            <input
                                type="text"
                                id="quantidadeEstoque"
                                name="quantidadeEstoque"
                                placeholder="Qtd em Estoque"
                                minLength="1"
                                maxLength="100"
                                required
                                value={this.state.produto.quantidadeEstoque}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-insert">
                            <label htmlFor="datadeCompra">Data de Compra </label>
                            <br />
                            <input
                                type="date"
                                id="datadeCompra"
                                name="datadeCompra"
                                placeholder="Data de Compra"
                                required
                                value={this.state.produto.datadeCompra}
                                onChange={this.handleInputChange}
                            />
                        </div>
 
                        <div className="produto-insert">
                            <label>
                                <input
                                    type="radio"
                                    name="ativo"
                                    value="true"
                                    checked={this.state.produto.ativo === "true"}
                                    onChange={this.handleInputChange}
                                />
                                Ativo
                        </label>
                            <label>
                                <input
                                    type="radio"
                                    value="false"
                                    name="ativo"
                                    checked={this.state.produto.ativo === "false"}
                                    onChange={this.handleInputChange}
                                />
                                Inativo
                        </label>
                        </div>
 
 
                        <button type="submit" className="btn btn-primary">
                            Cadastrar
                    </button>
                    </fieldset>
                </form>
            );
        }
    }
 
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
 
        this.setState(prevState => ({
            produto: { ...prevState.produto, [name]: value }
        }));
        console.log(value);
    };
 
    handleSubmit = event => {
        fetch(`${process.env.REACT_APP_API_URL}`, {
            method: "post",
            body: JSON.stringify(this.state.produto),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error });
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));
 
        event.preventDefault();
    };
}
 
export default Criarproduto;