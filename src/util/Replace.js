import React from 'react';

export function RemoverCaracteresEspeciais(texto) {
    return  texto.normalize('NFD').replace(/[^a-zA-Zs]/g, "");
}
export function RemoverCaracteresEspeciaisMinusculo(texto) {
    return  texto.normalize('NFD').replace(/[^a-zA-Zs\s]/g, "").replace(/\s/g, "_").toLowerCase();
}