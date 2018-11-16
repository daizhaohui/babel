const AutoAssign = require('./autoAssign');

module.exports = function (babel) {
    return {
        visitor: {
            Class(path) {
                new AutoAssign(babel.types).run(path.node);
            },
            FunctionDeclaration(path, state) {
                //console.log(`name:${path.node.name}`);
                //console.log('FunctionDeclaration');
            },
            BinaryExpression(path) {
                //console.log('BinaryExpression');
            },
            Program(path, file) {
                //console.log('Program');
            }

        }
    };
}