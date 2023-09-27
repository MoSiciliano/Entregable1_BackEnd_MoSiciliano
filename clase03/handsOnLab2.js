//Calculadora positiva con promesas clase 03
const suma = (a, b) => {
  return new Promise((res, rej) => {
    if (a === 0 || b === 0) {
      return rej("Operación innecesaria ⛔");
    }
    const result = a + b;
    if (result < 0) {
      return rej("La calculadora sólo debe devolver valores positivos ⛔");
    }
    res(result);
  });
};

const resta = (a, b) => {
  return new Promise((res, rej) => {
    if (a === 0 || b === 0) {
      return rej("Operación innecesaria ⛔");
    }
    const result = a - b;
    if (result < 0) {
      return rej("La calculadora sólo debe devolver valores positivos ⛔");
    }
    res(result);
  });
};

const multiplicacion = (a, b) => {
  return new Promise((res, rej) => {
    if (a === 0 || b === 0) {
      return rej("Operación innecesaria ⛔");
    }
    const result = a * b;
    if (result < 0) {
      return rej("La calculadora sólo debe devolver valores positivos ⛔");
    }
    res(result);
  });
};

const division = (a, b) => {
  return new Promise((res, rej) => {
    if (a === 0 || b === 0) {
      return rej("Operación innecesaria ⛔");
    }
    const result = a / b;
    if (result < 0) {
      return rej("La calculadora sólo debe devolver valores positivos ⛔");
    }
    res(result);
  });
};

const calculos = async () => {
  try {
    let result = await suma(2, 3);
    console.log(`Suma: ${result}`);
    result = await resta(10, 5);
    console.log(`Resta: ${result}`);
    result = await multiplicacion(20, 5);
    console.log(`Multiplicación: ${result}`);
    result = await division(10, 2);
    console.log(`División: ${result}`);
  } catch (error) {
    console.error("calc", error);
  }
};
calculos();
