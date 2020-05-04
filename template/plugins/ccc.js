exports.defineTags = function(dictionary) {
    // define tags here
    dictionary.defineTag('ccc', {
        onTagged: function(doclet, tag) {
            doclet.scope = "ccc";
        }
    });
};

exports.astNodeVisitor = {
    visitNode: function(node, e, parser, currentSourceName) {
        console.log(currentSourceName)
        // do all sorts of crazy things here
    }
};