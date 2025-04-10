export default function UserGuide() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-center text-pink-400 mb-4">User Guide</h2>

      <div className="space-y-4">
        <section className="border border-pink-400 p-4 rounded-md">
          <h3 className="text-xl text-pink-400 mb-2">Getting Started</h3>
          <p className="mb-2">
            Welcome to the Heap Sort Visualizer! This tool helps you understand how the Heap Sort algorithm works
            through interactive visualization.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Use the <span className="text-pink-400 font-bold">Generate Random Array</span> button to create a new
              random array.
            </li>
            <li>
              Adjust the <span className="text-pink-400 font-bold">Array Size</span> slider to change the number of
              elements.
            </li>
            <li>
              Enter your own values in the <span className="text-pink-400 font-bold">Custom Array</span> input
              (comma-separated).
            </li>
            <li>
              Toggle between <span className="text-pink-400 font-bold">Max Heap</span> and{" "}
              <span className="text-pink-400 font-bold">Min Heap</span> using the switch at the top.
            </li>
          </ul>
        </section>

        <section className="border border-pink-400 p-4 rounded-md">
          <h3 className="text-xl text-pink-400 mb-2">Visualization Controls</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <span className="text-pink-400 font-bold">Play/Pause</span>: Start or pause the animation.
            </li>
            <li>
              <span className="text-pink-400 font-bold">Step Forward/Backward</span>: Move through the algorithm one
              step at a time.
            </li>
            <li>
              <span className="text-pink-400 font-bold">Skip to Beginning/End</span>: Jump to the start or end of the
              algorithm.
            </li>
            <li>
              <span className="text-pink-400 font-bold">Speed Control</span>: Adjust how fast the animation runs.
            </li>
          </ul>
        </section>

        <section className="border border-pink-400 p-4 rounded-md">
          <h3 className="text-xl text-pink-400 mb-2">Understanding the Visualization</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="text-pink-400 font-bold">Heap Structure</span>: Shows the binary tree representation of
              the heap.
              <ul className="list-circle pl-5 mt-1">
                <li>The root node is at the top.</li>
                <li>Each node has at most two children.</li>
                <li>In a max heap, each parent is greater than or equal to its children.</li>
                <li>In a min heap, each parent is less than or equal to its children.</li>
              </ul>
            </li>
            <li>
              <span className="text-pink-400 font-bold">Array View</span>: Shows the array representation of the heap.
              <ul className="list-circle pl-5 mt-1">
                <li>For a node at index i, its left child is at index 2i+1 and right child at 2i+2.</li>
                <li>The parent of a node at index i is at index floor((i-1)/2).</li>
              </ul>
            </li>
            <li>
              <span className="text-pink-400 font-bold">Color Coding</span>:
              <ul className="list-circle pl-5 mt-1">
                <li>
                  <span className="text-pink-400">Pink</span>: Regular elements
                </li>
                <li>
                  <span className="text-yellow-400">Yellow</span>: Elements being examined
                </li>
                <li>
                  <span className="text-red-400">Red</span>: Elements being swapped
                </li>
                <li>
                  <span className="text-pink-600">Dark Pink</span>: Elements in their final sorted position
                </li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="border border-pink-400 p-4 rounded-md">
          <h3 className="text-xl text-pink-400 mb-2">Tips</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Start with a small array (5-7 elements) to easily follow the algorithm steps.</li>
            <li>Use the step-by-step controls to carefully observe how the heap is built and sorted.</li>
            <li>Pay attention to the description text that explains what's happening at each step.</li>
            <li>Try different arrays to see how the algorithm performs with various inputs.</li>
            <li>Compare the behavior of max heap vs min heap to understand the differences.</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
