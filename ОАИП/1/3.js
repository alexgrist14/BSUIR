// Исходная матрица
let matrix = [
    [4, 1, 7, 3, 2, 6, 5, 8],
    [12, 3, 5, 9, 2, 4, 1, 6],
    [8, 5, 7, 2, 3, 4, 6, 1],
    [10, 2, 3, 4, 1, 6, 7, 5],
    [9, 4, 6, 2, 3, 5, 7, 1],
    [11, 3, 5, 6, 2, 4, 8, 7]
];

// 1. Упорядочиваем элементы строк по невозрастанию
matrix = matrix.map(row => row.sort((a, b) => b - a));

// Функция для вычисления произведения элементов строки
function rowProduct(row) {
    return row.reduce((product, num) => product * num, 1);
}

// 2. Сортируем строки матрицы по возрастанию произведения
for (let i = 0; i < matrix.length - 1; i++) {
    for (let j = 0; j < matrix.length - i - 1; j++) {
        if (rowProduct(matrix[j]) > rowProduct(matrix[j + 1])) {
            // Меняем строки местами
            let temp = matrix[j];
            matrix[j] = matrix[j + 1];
            matrix[j + 1] = temp;
        }
    }
}

// Выводим результат
console.log("Отсортированная матрица:");
matrix.forEach(row => console.log(row));
