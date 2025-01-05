/**
 * Returns a specified number of random items from an array.
 *
 * @param {Array} array - The input array from which to select random items.
 * @param {number} count - The number of random items to select (default is 2).
 * @returns {Array} An array containing the randomly selected items.
 */
export const getRandomItemsFromArray = (array, count = 2) => {
  // Ensure the count is at least 0
  count = Math.max(0, count);

  // If the array has less than two items, adjust the count accordingly
  count = Math.min(count, array.length);

  // Create a copy of the input array to avoid modifying the original array
  const copyArray = array.slice();

  // Initialize an array to store the selected random items
  const randomItems = [];

  // Select random items until the desired count is reached
  for (let i = 0; i < count; i++) {
    if (copyArray.length === 0) {
      // If the array is empty, break the loop
      break;
    }

    // Generate a random index within the current length of the copyArray
    const randomIndex = Math.floor(Math.random() * copyArray.length);

    // Remove the selected item from the copyArray and add it to randomItems
    randomItems.push(copyArray.splice(randomIndex, 1)[0]);
  }

  return randomItems;
};
