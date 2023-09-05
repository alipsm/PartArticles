function getIndexRow(index,currentPage,rowCount) {
    return index + 1 + (currentPage - 1) * rowCount;
  }

  module.exports={getIndexRow}