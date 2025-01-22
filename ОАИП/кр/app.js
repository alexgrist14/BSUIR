function generateArrays(size) {
  let randomArray = Array.from({ length: size }, () =>
    Math.floor(Math.random() * 10000)
  );
  let sortedArray = [...randomArray].sort((a, b) => a - b);
  let reversedArray = [...sortedArray].reverse();
  return { randomArray, sortedArray, reversedArray };
}

function bubbleSortWithFlag(array) {
  let countComparisons = 0,
    countSwaps = 0;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < array.length - 1; i++) {
      countComparisons++;
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
        countSwaps++;
      }
    }
  } while (swapped);
  return { sortedArray: array, countComparisons, countSwaps };
}

function heapify(arr, n, i, counters) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  counters.countComparisons++;
  if (left < n && arr[left] > arr[largest]) largest = left;

  counters.countComparisons++;
  if (right < n && arr[right] > arr[largest]) largest = right;

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    counters.countSwaps++;
    heapify(arr, n, largest, counters);
  }
}

function heapSort(array) {
  let counters = { countComparisons: 0, countSwaps: 0 };
  let n = array.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
    heapify(array, n, i, counters);
  for (let i = n - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    counters.countSwaps++;
    heapify(array, i, 0, counters);
  }
  return {
    sortedArray: array,
    countComparisons: counters.countComparisons,
    countSwaps: counters.countSwaps,
  };
}

function runExperiment() {
  const sizes = [100, 200, 300, 500, 1000, 2000];
  let results = [];

  sizes.forEach((size) => {
    let { randomArray, sortedArray, reversedArray } = generateArrays(size);

    let randomBubble = bubbleSortWithFlag([...randomArray]);
    let sortedBubble = bubbleSortWithFlag([...sortedArray]);
    let reversedBubble = bubbleSortWithFlag([...reversedArray]);

    let randomHeap = heapSort([...randomArray]);
    let sortedHeap = heapSort([...sortedArray]);
    let reversedHeap = heapSort([...reversedArray]);

    results.push({
      size,
      bubble: {
        random: randomBubble,
        sorted: sortedBubble,
        reversed: reversedBubble,
      },
      heap: {
        random: randomHeap,
        sorted: sortedHeap,
        reversed: reversedHeap,
      },
    });
  });

  return results;
}

function theoreticalComplexityBubble(size) {
  return {
    comparisons: (size * (size - 1)) / 2,
    swaps: (size * (size - 1)) / 4,
  };
}

function theoreticalComplexityHeap(size) {
  return {
    comparisons: size * Math.log2(size),
    swaps: (size * Math.log2(size)) / 2,
  };
}

function displayResults(results) {
  console.log(
    "Размерность | Экспериментальное Bubble | Теоретическое Bubble | Экспериментальное Heap | Теоретическое Heap"
  );
  console.log(
    "            | Сравнения / Перестановки  | Сравнения / Перестановки | Сравнения / Перестановки | Сравнения / Перестановки"
  );
  results.forEach((result) => {
    const { size, bubble, heap } = result;

    let bubbleTheoretical = theoreticalComplexityBubble(size);
    let heapTheoretical = theoreticalComplexityHeap(size);

    console.log(
      `${size}         | ${bubble.random.countComparisons}/${
        bubble.random.countSwaps
      }  | ${Math.round(bubbleTheoretical.comparisons)}/${Math.round(
        bubbleTheoretical.swaps
      )}  | ` +
        `${heap.random.countComparisons}/${
          heap.random.countSwaps
        }  | ${Math.round(heapTheoretical.comparisons)}/${Math.round(
          heapTheoretical.swaps
        )}`
    );
  });
}

const results = runExperiment();
displayResults(results);
console.log(results.bubble.random)
