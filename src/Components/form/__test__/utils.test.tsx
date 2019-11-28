import React from 'react';
import * as utils from '../utils';

describe('Utils', () => {
    describe('removeStringPadding', () => {
        it('should return same value if argument is empty', () => {
            expect(utils.removeStringPadding('')).toEqual('');
        });

        it('should return string without whitespace padding', () => {
            expect(utils.removeStringPadding('    Ramiro Escobar GB     23    0.1      ')).toEqual('Ramiro Escobar GB 23 0.1');
        });
    });
    describe('toPersonObject', () => {
        it('should return undefined when argument is empty string', () => {
            expect(utils.toPersonData('')).toBeUndefined();
        });

        it('should return undefined if string argument has insufficient amount of info', () => {
            expect(utils.toPersonData('Ramiro Escobar GB')).toBeUndefined();
        });

        it('should return correct object when valid data provided - simple name ', () => {
            const expected = {
                id: -1,
                first_name: 'Ramiro Escobar',
                last_name: '',
                age: 13,
                nationality: 'GB',
                risk_percentage: 10,
            };
            expect(utils.toPersonData('    Ramiro Escobar GB 13 0.1    ')).toEqual(expected);
        });

        it('should return correct object when valid data provided - complex name', () => {
            const expected = {
                id: -1,
                first_name: 'Willem de Leeuw Verbeek',
                last_name: '',
                age: 44,
                nationality: 'NL',
                risk_percentage: 45,
            };
            expect(utils.toPersonData('    Willem de Leeuw Verbeek NL 44   0.45   ')).toEqual(expected);
        });

        it('should return correct object when valid data provided - date of birth', () => {
            const expected = {
                id: -1,
                first_name: 'Joseane Silva',
                last_name: '',
                age: 25,
                nationality: 'MX',
                risk_percentage: 23,
            };
            expect(utils.toPersonData('    Joseane    Silva     MX   12/12/1993    0.2300   ')).toEqual(expected);
        });

        it('should return undefined - when percentage value above 100%', () => {
            expect(utils.toPersonData('    Joseane    Silva     MX   12/12/1993    1.2300   ')).toBeUndefined();
        });

        it('should return undefined if age is above 120', () => {
            expect(utils.toPersonData('    Ramiro Escobar GB 130 0.1    ')).toBeUndefined();
        });
    });
    describe('parseInput', () => {
        it('should return undefined if invalid argument', () => {
            expect(utils.parseInput('')).toBeUndefined();
        });

        it('should return valid string array', () => {
            expect(utils.parseInput('    Ramiro Escobar GB     23    0.1      ')).toEqual(['    Ramiro Escobar GB     23    0.1      ']);
            const multiLineInput = '    Ramiro Escobar GB     23    0.1      \n ' +
                'Jennifer Stevens US  34 1.02 \n' +
                'Shreya Khan IN   16/02/1991     0.7\n' +
                'Katherine Hannah Long      FR    10/01/1978    0.1\n' +
                'Willem de Leeuw Verbeek     NL 44   0.45   \n  ' +
                'Joseane Silva MX 12/12/1993 1.2300  \n   ' +
                'Charlie Smith IE 22 0.005e2    ';
            const expectedOutput = [
                '    Ramiro Escobar GB     23    0.1      ',
                ' Jennifer Stevens US  34 1.02 ',
                'Shreya Khan IN   16/02/1991     0.7',
                'Katherine Hannah Long      FR    10/01/1978    0.1',
                'Willem de Leeuw Verbeek     NL 44   0.45   ',
                '  Joseane Silva MX 12/12/1993 1.2300  ',
                '   Charlie Smith IE 22 0.005e2    '
            ];
            expect(utils.parseInput(multiLineInput)).toEqual(expectedOutput);
        });
    });
});
