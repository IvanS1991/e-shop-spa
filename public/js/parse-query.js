let parseQuery = function(url) {
  let output = {};
  let queries = url.split("?");
  if (queries.length === 1) {
    return output;
  }
  let fullQuery = "?" + queries[1];
  output["fullQuery"] = fullQuery;
  queries = queries[1].split("&")
                  .map(x => x.split("="))
  queries.forEach(x => output[x[0]] = x[1]);
  return output;
};