// склонение числительных
// пример использования:
// getDeclOfNum(total, ['час', 'часа', 'часов'])
// задаем вопрос к: 1, 3, 5
function getDeclOfNum(number, titles) {
    let cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}

export function getTotalTime(total) {
    return total + " " + getDeclOfNum(total, ['час', 'часа', 'часов']);
}
