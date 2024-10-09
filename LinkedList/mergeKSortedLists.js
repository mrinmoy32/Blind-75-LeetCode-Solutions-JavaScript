// My 1st Solution:

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */

// var mergeKLists = function (lists) {
//     const startingNode = new ListNode(0)
//     let current = startingNode
//     let smallestHead

//     lists = lists.filter(list => list != null)
//     while (lists.length > 0) {

//         smallestHead = lists.reduce((smallest, list) =>
//             (smallest.val < list.val ? smallest : list)
//             , lists[0])

//         current.next = smallestHead
//         current = current.next

//         let index = lists.indexOf(smallestHead)
//         lists[index] = lists[index].next

//         lists = lists.filter(list => list != null)

//     };
//     return startingNode.next
// }



// Best Solution using min-heap (priority queue)

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    // MinHeap class definition
    class MinHeap {
        constructor() {
            this.heap = [];
        }
        
        // Insert a new node into the heap
        insert(node) {
            this.heap.push(node);
            this._heapifyUp();
        }
        
        // Remove and return the smallest element from the heap
        extractMin() {
            if (this.heap.length === 0) return null;
            if (this.heap.length === 1) return this.heap.pop();
            
            const min = this.heap[0];
            this.heap[0] = this.heap.pop();
            this._heapifyDown();
            
            return min;
        }
        
        // Helper function to maintain the heap property after inserting a new node
        _heapifyUp() {
            let index = this.heap.length - 1;
            while (index > 0) {
                let parentIndex = Math.floor((index - 1) / 2);
                
                if (this.heap[parentIndex].val <= this.heap[index].val) break;
                
                [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
                index = parentIndex;
            }
        }
        
        // Helper function to maintain the heap property after extracting the minimum node
        _heapifyDown() {
            let index = 0;
            const length = this.heap.length;
            
            while (true) {
                let leftIndex = 2 * index + 1;
                let rightIndex = 2 * index + 2;
                let smallest = index;
                
                if (leftIndex < length && this.heap[leftIndex].val < this.heap[smallest].val) {
                    smallest = leftIndex;
                }
                
                if (rightIndex < length && this.heap[rightIndex].val < this.heap[smallest].val) {
                    smallest = rightIndex;
                }
                
                if (smallest === index) break;
                
                [this.heap[smallest], this.heap[index]] = [this.heap[index], this.heap[smallest]];
                index = smallest;
            }
        }
        
        // Check if the heap is empty
        isEmpty() {
            return this.heap.length === 0;
        }
    }
    
    // Initialize the heap and result list
    const minHeap = new MinHeap();
    let dummy = new ListNode(0);
    let current = dummy;
    
    // Add the first node of each list to the heap
    for (let list of lists) {
        if (list !== null) {
            minHeap.insert(list);
        }
    }
    
    // Process the heap until it's empty
    while (!minHeap.isEmpty()) {
        let smallestNode = minHeap.extractMin(); // Extract the smallest node
        current.next = smallestNode;  // Add the smallest node to the result list
        current = current.next;  // Move to the next position in the result list
        
        if (smallestNode.next !== null) {
            minHeap.insert(smallestNode.next);  // If there is a next node, add it to the heap
        }
    }
    
    // Return the merged list starting from dummy.next
    return dummy.next;
};
