query = handlebars `/assets/search.graphql` --slug=slug --commit=head_sha

res = github graphql query

return res.data.search.nodes[0].commits.nodes[0].commit.parents.edges[0].node.oid
