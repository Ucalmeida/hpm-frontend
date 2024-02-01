import React from 'react';
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table';
import PropTypes from 'prop-types';
import { Input } from '../form';
import { Botao } from '../Botao';
import { BOTAO } from '../../util/Constantes';

export function Tabela ({ columns, data, rowsPerPage }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: {
      pageSize,
      pageIndex,
      sortBy: [],
      hiddenColumns: [],
      globalFilter,
    },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: rowsPerPage }, // Definindo o tamanho da página inicial
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  console.log('Colunas:', columns)
  console.log('Dados:', data)

  // const { globalFilter } = state
  console.log('Global Filter:', globalFilter)
  // console.log('State:', state)

  const selecionarLinhasPorPagina = (e) => {
    e.preventDefault()
    setPageSize(Number(e.target.value))
  }

  const upperCaseValue = (globalFilter || '').toUpperCase()

  return (
    <div>
      <div className='row d-flex justify-content-between align-items-center'>
        <div className='col-lg-3 mt-3'>
          <select
              className="form-control"
              value={pageSize}
              onChange={selecionarLinhasPorPagina}>
              {[5, 10, 20, 30, 40, 50].map((size) => {
                  return <option 
                            className="flex-fill" key={size} value={size}> 
                              Mostrar {size} linhas por página
                        </option>
              })}
          </select>
        </div>
        <div className='col-lg-3'>
        {/* Barra de pesquisa global */}
          <Input
            label="Pesquisar"
            type="text"
            value={upperCaseValue}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Pesquisar..."
          />
        </div>
      </div>

      {/* Tabela */}
      <table className='table table-striped-columns' {...getTableProps()} style={{ marginTop: '1em' }}>
        {/* Cabeçalho da tabela */}
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Ícone de classificação */}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' ↓' : ' ↑') : ''}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* Corpo da tabela */}
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Paginação e controles */}
      <div>
        <span>
          Página{' '}
          <strong>
            {pageIndex + 1} de {pageOptions.length}&ensp;
          </strong>
        </span>
        <Botao cor={BOTAO.COR.OUTLINE_PRIMARY} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        {'<<'}
        </Botao>
        <Botao cor={BOTAO.COR.OUTLINE_PRIMARY} onClick={() => previousPage()} disabled={!canPreviousPage}>
          Anterior
        </Botao>
        <Botao cor={BOTAO.COR.OUTLINE_PRIMARY} onClick={() => nextPage()} disabled={!canNextPage}>
          Próxima
        </Botao>
        <Botao cor={BOTAO.COR.OUTLINE_PRIMARY} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </Botao>
      </div>
    </div>
  );
};

Tabela.propTypes = {
  columns: PropTypes.array.isRequired, 
  data: PropTypes.array.isRequired, 
  rowsPerPage: PropTypes.number,
}
