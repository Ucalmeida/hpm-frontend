import {ConverterCaracteresEspeciaisMinusculo} from "../../util";
import PropTypes from "prop-types";

export function DataTable(props) {
    const gerarColunas = () => {
        return props.colunas.map((coluna, index) => {
            if (!coluna.key) coluna.key = ConverterCaracteresEspeciaisMinusculo(coluna.text);
            if (!coluna.sortable) coluna.sortable = true
            return (
                <th key={coluna.key}>
                    {coluna.text}
                </th>
            )
        })
    }

    const gerarDados = () => {
        return props.dados.map((dado) => {
                let chaves = Object.keys(dado)
                console.log('Chaves:', chaves)
                chaves.forEach((chave, index) => {
                    console.log(dado[chave])
                    if (!dado.key) dado.key = dado[1]
                    return (
                        <td key={dado.key}>
                            dado[chave]
                        </td>
                    )
            })
        })
    }

    return (
        <table className="table table-striped table-hover table-bordered">
            <thead>
            <tr>
                {gerarColunas()}
            </tr>
            </thead>
            <tbody>
                <tr>
                    {gerarDados()}
                </tr>
            </tbody>
        </table>
    )
}

DataTable.propTypes = {
    id: PropTypes.string,
    colunas: PropTypes.array.isRequired,
    dados: PropTypes.any.isRequired,
    rodape: PropTypes.string,
    botoes: PropTypes.bool,
    botoesExtra: PropTypes.any,
    pesquisar: PropTypes.bool,
    pageSize: PropTypes.number.isRequired
};
DataTable.defaultProps = {
    botoes: true
}