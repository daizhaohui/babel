function AutoAssign(types) {
    this.types = types;
}

function findAutoAssignDecorators(klass) {
    return (klass.decorators || []).filter((decorator => {
        return decorator.expression.name === 'autoAssign';
    }));
}

function delteDecorators(klass, decorators) {
    decorators.forEach((decorator) => {
        const index = klass.decorators.indexOf(decorator);
        if (index >= 0) {
            klass.decorators.splice(index, 1);
        }
    });
}

function findConstructor(klass) {
    return klass.body.body.filter(body => {
        return body.kind === 'constructor'
    })[0];
}

function getArguments(ctor) {
    return ctor.params;
}

function prependAssignments(ctor, args, types) {
    const body = ctor.body.body;
    args.slice().reverse().forEach(arg => {
        const assignment = buildAssignment(types, arg);
        body.unshift(assignment);
    });
}

function buildAssignment(types, arg) {
    const self = types.identifier('this');
    const prop = types.memberExpression(self, arg);
    const assignment = types.assignmentExpression('=', prop, arg);
    return types.expressionStatement(assignment);
}

AutoAssign.prototype.run = function (klass) {
    const decorators = findAutoAssignDecorators(klass);
    if (decorators.length > 0) {
        const ctor = findConstructor(klass);
        const args = getArguments(ctor);
        prependAssignments(ctor, args, this.types);
        delteDecorators(klass, decorators);
    }
}
module.exports = AutoAssign;