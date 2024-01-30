import React from 'react';
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table';
import PropTypes from 'prop-types';
import { Input } from '../form';

export function Tabela ({ columns, data, pageSize }) {
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
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize }, // Definindo o tamanho da página inicial
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter } = state;
  console.log('State:', state);
  console.log('Options:', pageOptions);
  console.log('Next:', canNextPage);
  console.log('Previous:', canPreviousPage);

  return (
    <div>
      {/* Barra de pesquisa global */}
      <Input
        label="Pesquisar"
        type="text"
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Pesquisar..."
      />

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

      {/* Paginação */}
      <div>
        <span>
          Página{' '}
          <strong>
            {state.pageIndex + 1} de {pageCount}
          </strong>{' '}
        </span>
        <button onClick={() => state.previousPage()} disabled={!canPreviousPage}>
          Anterior
        </button>
        <button onClick={() => state.nextPage()} disabled={!canNextPage}>
          Próxima
        </button>
      </div>
    </div>
  );
};

Tabela.propTypes = {
  columns: PropTypes.array.isRequired, 
  data: PropTypes.array.isRequired, 
  pageSize: PropTypes.number,
}
