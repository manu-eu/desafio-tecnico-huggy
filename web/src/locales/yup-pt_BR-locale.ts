import { LocaleObject } from 'yup/lib/locale'

const locale: LocaleObject = {
    mixed: {
        default: '${label} é inválido',
        required: '${label} é um campo obrigatório',
        oneOf: '${label} deve ser um dos seguintes valores: ${values}',
        notOneOf: '${label} não pode ser um dos seguintes valores: ${values}',
    },
    string: {
        length: '${label} deve ter exatamente ${length} caracteres',
        min: '${label} deve ter pelo menos ${min} caracteres',
        max: '${label} deve ter no máximo ${max} caracteres',
        email: '${label} tem o formato de e-mail inválido',
        url: '${label} deve ter um formato de URL válida',
        trim: '${label} não deve conter espaços no início ou no fim.',
        lowercase: '${label} deve estar em maiúsculo',
        uppercase: '${label} deve estar em minúsculo',
        matches: '${label} não corresponde ao formato',
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