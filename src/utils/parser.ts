// This file hardens the math.js parser to be less vulnerable
// See: https://mathjs.org/docs/expressions/security.html
import { create, all } from 'mathjs';

const math = create(all);

export const evaluate = math.evaluate;
export const simplify = math.simplify;

math.import({
    'import': function () { throw new Error('Function import is disabled') },
    'createUnit': function () { throw new Error('Function createUnit is disabled') },
    'evaluate': function () { throw new Error('Function evaluate is disabled') },
    'parse': function () { throw new Error('Function parse is disabled') },
    'simplify': function () { throw new Error('Function simplify is disabled') },
    'derivative': function () { throw new Error('Function derivative is disabled') }
}, { override: true });
