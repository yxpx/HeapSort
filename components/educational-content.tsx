export default function EducationalContent() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-center text-pink-400 mb-4">Learn Heap Sort</h2>

      <div className="space-y-4">
        <section className="border border-pink-400 p-4 rounded-md">
          <h3 className="text-xl text-pink-400 mb-2">What is Heap Sort?</h3>
          <p>
            Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It's an in-place
            algorithm with O(n log n) time complexity, making it efficient for large datasets.
          </p>
        </section>

        <section className="border border-pink-400 p-4 rounded-md">
          <h3 className="text-xl text-pink-400 mb-2">How Heap Sort Works</h3>
          <p className="mb-2">Heap Sort works in two main phases:</p>

          <div className="mb-3">
            <h4 className="text-lg text-pink-400">1. Build Heap</h4>
            <p>First, the algorithm transforms the input array into a heap (either max heap or min heap):</p>
            <ul className="list-disc pl-5 mt-1">
              <li>
                <strong>Max Heap:</strong> The largest element is at the root and every parent node is greater than or
                equal to its children.
              </li>
              <li>
                <strong>Min Heap:</strong> The smallest element is at the root and every parent node is less than or
                equal to its children.
              </li>
              <li>Start from the last non-leaf node (index n/2-1) and work backwards to the root.</li>
              <li>For each node, perform a "heapify" operation to ensure the heap property.</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg text-pink-400">2. Sort Phase</h4>
            <p>Once the heap is built, the algorithm repeatedly extracts the root element and rebuilds the heap:</p>
            <ul className="list-disc pl-5 mt-1">
              <li>Swap the root with the last element in the heap.</li>
              <li>Reduce the heap size by 1 to exclude the sorted element.</li>
              <li>Heapify the root to restore the heap property.</li>
              <li>Repeat until all elements are sorted.</li>
              <li>For a max heap, this produces an ascending order; for a min heap, a descending order.</li>
            </ul>
          </div>
        </section>

        <section className="border border-pink-400 p-4 rounded-md">
          <h3 className="text-xl text-pink-400 mb-2">The Heapify Operation</h3>
          <p>
            The heapify operation is a key part of Heap Sort. It ensures that a subtree rooted at a given index
            maintains the heap property.
          </p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>
              Compare the root with its left and right children to find the largest value (for max heap) or smallest
              value (for min heap).
            </li>
            <li>If the largest/smallest value is not the root, swap the root with that child.</li>
            <li>Recursively heapify the affected subtree.</li>
          </ol>
        </section>

        <section className="border border-pink-400 p-4 rounded-md">
          <h3 className="text-xl text-pink-400 mb-2">Time and Space Complexity</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="text-pink-400 font-bold">Time Complexity</span>:
              <ul className="list-circle pl-5 mt-1">
                <li>Best Case: O(n log n)</li>
                <li>Average Case: O(n log n)</li>
                <li>Worst Case: O(n log n)</li>
                <li>Building the heap takes O(n) time.</li>
                <li>The sorting phase takes O(n log n) time.</li>
              </ul>
            </li>
            <li>
              <span className="text-pink-400 font-bold">Space Complexity</span>: O(1)
              <ul className="list-circle pl-5 mt-1">
                <li>Heap Sort is an in-place algorithm, requiring only a constant amount of extra space.</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="border border-pink-400 p-4 rounded-md">
          <h3 className="text-xl text-pink-400 mb-2">Advantages and Disadvantages</h3>

          <div className="mb-3">
            <h4 className="text-lg text-pink-400">Advantages</h4>
            <ul className="list-disc pl-5">
              <li>Efficient time complexity of O(n log n) for all cases.</li>
              <li>In-place sorting algorithm with O(1) extra space.</li>
              <li>Works well for large datasets.</li>
              <li>Not affected by the initial order of elements.</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg text-pink-400">Disadvantages</h4>
            <ul className="list-disc pl-5">
              <li>Not stable - equal elements may change their relative order.</li>
              <li>Slower than Quick Sort in practice for most inputs.</li>
              <li>Poor cache performance due to non-sequential memory access.</li>
            </ul>
          </div>
        </section>

        <section className="border border-pink-400 p-4 rounded-md">
          <h3 className="text-xl text-pink-400 mb-2">Real-World Applications</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Priority queues in operating systems for process scheduling.</li>
            <li>The K-way merge algorithm used in external sorting.</li>
            <li>Finding the k largest or smallest elements in a collection.</li>
            <li>Graph algorithms like Dijkstra's shortest path and Prim's minimum spanning tree.</li>
            <li>Memory management in programming languages and databases.</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
