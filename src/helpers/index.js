exports.isDefine = (input) => !!input;

const nonAnyWhiteSpace = /\S/;
exports.isNotDefineOrWhiteSpace = (input) => (
    !exports.isDefine(input) || 
    !nonAnyWhiteSpace.test(input)
);