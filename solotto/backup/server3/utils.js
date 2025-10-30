'use strict';

function getDateSQL () {
  const date = new Date
  const year = formatTime(date.getUTCFullYear());
  const month = formatTime(date.getUTCMonth());
  const day = formatTime(date.getUTCDate());
  return `_${year}_${month}_${day}_`;
}
