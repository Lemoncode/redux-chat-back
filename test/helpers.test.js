const expect = require('chai').expect;

const { isNotDefineOrWhiteSpace } = require('../src/helpers');

describe('helpers', () => {
    describe('isNotDefineOrWhiteSpace', () => {
        describe('when input is null', () => {
            it('returns true', () => {
                const input = null;
                const result = isNotDefineOrWhiteSpace(input);
                expect(result).true;
            });
        });

        describe('when input is undefined', () => {
            it('resturns true', () => {
                let input;
                const result = isNotDefineOrWhiteSpace(input);
                expect(result).true;
            });
        });

        describe('when input is empty', () => {
            it('returns true', () => {
                const input = '';
                const result = isNotDefineOrWhiteSpace(input);
                expect(result).true;
            });
        });

        describe('when input is white space', () => {
            it('returns true', () => {
                const input = ' ';
                const result = isNotDefineOrWhiteSpace(input);
                expect(result).true;
            });
        });

        describe('when input has value', () => {
            it('returns false', () => {
                const input = 'v';
                const result = isNotDefineOrWhiteSpace(input);
                expect(result).false;
            });
        });

        describe('when input starts with white sapace and has characters', () => {
            it('returns false', () => {
                const input = '   CA';
                const result = isNotDefineOrWhiteSpace(input);
                expect(result).false;
            });
        });
    });
});