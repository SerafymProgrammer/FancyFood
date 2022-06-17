export const reducePrice = arr => {
  // console.log(Number(element.price))
  let reducer = 0;
  arr.forEach(element => {
    reducer += Number(element.price);
  });
  // (accumulator, item) => accumulator + Number(item.price);
  return reducer;
};

export function textOverflow(count, str) {
  if (str.length > count) {
    str = str.slice(0, count) + '...';
    return str;
  }

  return str;
}

export function formatted_time(time) {
  let h = time.getHours() + '';
  let m = time.getMinutes() + '';
  return `${h.length < 2 ? `0${h}` : h} : ${m.length < 2 ? `0${m}` : m}`;
}
