import { LocaleObject } from 'yup/lib/locale'

const locale: LocaleObject = {
    mixed: {
        default: 'O campo ${label} é inválido',
        required: 'O campo ${label} é obrigatório',
        oneOf: 'O campo ${label} deve ser preenchido com um dos seguintes valores: ${values}',
        notOneOf: 'O campo ${label} não pode ser preenchido com os valore: ${values}',
    },
    string: {
        length: 'O campo ${label} deve ter exatamente ${length} caracteres',
        min: 'O campo ${label} deve ter pelo menos ${min} caracteres',
        max: 'O campo ${label} deve ter no máximo ${max} caracteres',
        email: 'O campo ${label} deve ser preenchido com um e-mail válido',
        url: 'O campo ${label} deve ser preenchido com uma URL válida',
        trim: 'O campo ${label} não deve conter espaços no início ou no fim.',
        lowercase: 'O campo ${label} deve estar em maiúsculo',
        uppercase: 'O campo ${label} deve estar em minúsculo',
        matches: 'O campo ${label} deve ser preenchido com um formato válido',
    },
    number: {
        min: 'deve ser no mínimo ${min}',
        max: 'deve ser no máximo ${max}',
        lessThan: 'deve ser menor que ${less}',
        moreThan: 'deve ser maior que ${more}',
        // notEqual: 'não pode ser igual à ${notEqual}',
        positive: 'deve ser um número posítivo',
        negative: 'deve ser um número negativo',
        integer: 'deve ser um número inteiro',
    },
    date: {
        min: 'deve ser maior que a data ${min}',
        max: 'deve ser menor que a data ${max}',
    },
    array: {
        min: 'deve ter no mínimo ${min} itens',
        max: 'deve ter no máximo ${max} itens',
    },
};

export default locale;