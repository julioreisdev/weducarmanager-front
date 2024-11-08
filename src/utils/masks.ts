import React from "react";

export function phoneMask(
  setPhone: (value: React.SetStateAction<string>) => void,
  phone: string,
  value: string
) {
  if (value.length === 1 && value.length > phone.length) {
    setPhone("(" + value);
  } else if (value.length === 3 && value.length > phone.length) {
    setPhone(value + ") ");
  } else if (value.length === 10 && value.length > phone.length) {
    setPhone(value + "-");
  } else {
    setPhone(value);
  }
}

export function cpfMask(
  setCpf: (value: React.SetStateAction<string>) => void,
  cpf: string,
  value: string
) {
  if (value.length === 3 && value.length > cpf.length) {
    setCpf(value + ".");
  } else if (value.length === 7 && value.length > cpf.length) {
    setCpf(value + ".");
  } else if (value.length === 11 && value.length > cpf.length) {
    setCpf(value + "-");
  } else {
    setCpf(value);
  }
}

export function cnpjMask(
  setCnpj: (value: React.SetStateAction<string>) => void,
  cnpj: string,
  value: string
) {
  if (value.length === 2 && value.length > cnpj.length) {
    setCnpj(value + ".");
  } else if (value.length === 6 && value.length > cnpj.length) {
    setCnpj(value + ".");
  } else if (value.length === 10 && value.length > cnpj.length) {
    setCnpj(value + "/");
  } else if (value.length === 15 && value.length > cnpj.length) {
    setCnpj(value + "-");
  } else {
    setCnpj(value);
  }
}

export function rgMask(
  setRg: (value: React.SetStateAction<string>) => void,
  rg: string,
  value: string
) {
  if (value.length === 1 && value.length > rg.length) {
    setRg(value + ".");
  } else if (value.length === 5 && value.length > rg.length) {
    setRg(value + ".");
  } else {
    setRg(value);
  }
}

export function removeMaskCaracters(value: string) {
  return value.replace(".", "").replace("-", "").replace("/", "");
}
