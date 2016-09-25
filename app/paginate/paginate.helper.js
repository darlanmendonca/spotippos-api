'use strict';

module.exports = PaginateHelper;

function PaginateHelper(reqQuery) {
  let limitValid = reqQuery.limit && Number(reqQuery.limit) >= 0;
  let limitDefault = 20;
  let pageValid = reqQuery.page && Number(reqQuery.page) >= 1;
  let pageDefault = 0;

  let limit = limitValid ? Number(reqQuery.limit) : limitDefault;
  let skip = pageValid ? reqQuery.page - 1 : pageDefault;

  return {limit, skip};
}
