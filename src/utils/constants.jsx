const STATIC_DATA = [{}, {}, {}, {}, {}, {}];

export function updateStaticData(index, dataObj) {
  STATIC_DATA[index] = dataObj;
}

export function getStaticData(index) {
  return STATIC_DATA[index];
}
