import React, { createContext, useContext, useState } from 'react';

const FazendaContext = createContext();

export const FazendaProvider = ({ children, adicionarAoHistorico }) => {
  const [fazendas, setFazendas] = useState([]);
  const [nomeFazenda, setNomeFazenda] = useState('');

  const adicionarFazenda = (novaFazenda) => {
    setFazendas([...fazendas, novaFazenda]);
    adicionarAoHistorico(`Fazenda adicionada: ${novaFazenda.nome}`);
  };
  
  const atualizarFazenda = (id, novosDados) => {
    const fazendasAtualizadas = fazendas.map((fazenda) => {
      if (fazenda.id === id) {
        return { ...fazenda, ...novosDados };
      }
      return fazenda;
    });

    setFazendas(fazendasAtualizadas);
  };

  const removerFazenda = (id) => {s
    const fazendasFiltradas = fazendas.filter((fazenda) => fazenda.id !== id);
    setFazendas(fazendasFiltradas);
  };

  return (
    <FazendaContext.Provider
      value={{
        fazendas,
        setFazendas,
        nomeFazenda,
        setNomeFazenda,
        adicionarFazenda,
        atualizarFazenda,
        removerFazenda,
        adicionarAoHistorico,
      }}
    >
      {children}
    </FazendaContext.Provider>
  );
};

export const useFazenda = () => {
  return useContext(FazendaContext);
};