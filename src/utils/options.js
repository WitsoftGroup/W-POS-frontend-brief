export const documentTypes = [
  {
    value: 'CC',
    label: 'Cédula de Ciudadanía'
  },
  {
    value: 'TI',
    label: 'Tarjeta de Identidad'
  },
  {
    value: 'CCE',
    label: 'Cédula de Extranjería'
  },
  {
    value: 'TIE',
    label: 'Tarjeta de Extranjería'
  },
  {
    value: 'PAS',
    label: 'Pasaporte'
  },
  {
    value: 'NIT',
    label: 'NIT'
  }
];

export const userStatus = [
  {
    value: 'ACTIVE',
    label: 'Activo',
    color: 'success'
  },
  {
    value: 'INACTIVE',
    label: 'Inactivo',
    color: 'error'
  },
  {
    value: 'NEED_UPDATE_PASSWORD',
    label: 'Necesita actualizar contraseña',
    color: 'warning'
  }
];

export const paymentStatus = [
  {
    value: 'PAID',
    label: 'Pagado'
  },
  {
    value: 'PENDING',
    label: 'Pendiente'
  }
];

export const paymentMethods = [
  {
    value: 'CASH',
    label: 'Efectivo'
  },
  {
    value: 'CREDIT_CARD',
    label: 'Tarjeta de crédito'
  },
  {
    value: 'DEBIT_CARD',
    label: 'Tarjeta de débito'
  },
  {
    value: 'ELECTRONIC_BANK_TRANSFER',
    label: 'Transferencia electrónica'
  }
];

export const categoryStatus = [
  {
    value: 'ACTIVE',
    label: 'Activo'
  },
  {
    value: 'INACTIVE',
    label: 'Inactivo'
  }
];

export const productStatus = [
  {
    value: 'ACTIVE',
    label: 'Activo'
  },
  {
    value: 'INACTIVE',
    label: 'Inactivo'
  }
];
