import {ConverterCaracteresEspeciaisMinusculo} from "../../util";
import PropTypes from "prop-types";

export function DataTable(props) {
    const gerarColunas = () => {
        return props.colunas.map((coluna, index) => {
            console.log('Coluna:', coluna)
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
        let chaves = []
        let paciente = []
        return props.dados.map((dado, index) => {
            chaves = Object.keys(dado)
            paciente = Object.values(dado)
            console.log('Dados Paciente:', dado)
            console.log('Pacientes:', paciente)
            let myKey
            if (!myKey) myKey = index
            if (!dado.key) dado.key = dado.cpf_do_paciente
            return (
                <tr key={dado.key}>
                    {paciente.map((campo) => {
                        return (
                            <td key={myKey}>
                                {campo}
                            </td>
                        ) 
                    })}
                </tr>
            )
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