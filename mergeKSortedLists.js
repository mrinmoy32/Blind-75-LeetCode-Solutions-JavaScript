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

var mergeKLists = function (lists) {
    const startingNode = new ListNode(0)
    let current = startingNode
    let smallestHead

    lists = lists.filter(list => list != null)
    while (lists.length > 0) {

        smallestHead = lists.reduce((smallest, list) =>
            (smallest.val < list.val ? smallest : list)
            , lists[0])

        current.next = smallestHead
        current = current.next

        let index = lists.indexOf(smallestHead)
        lists[index] = lists[index].next

        lists = lists.filter(list => list != null)

    };
    return startingNode.next
}


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
    // Define a Min-Heap (Priority Queue) to store the heads of linked lists
    const minHeap = new MinPriorityQueue({priority: x => x.val});
    
    // Initialize the dummy node for the result linked list
    let dummy = new ListNode(0);
    let current = dummy;
    
    // Add the first node of each list to the min-heap
    for (let list of lists) {
        if (list) {
            minHeap.enqueue(list);
        }
    }
    
    // Process the min-heap
    while (!minHeap.isEmpty()) {
        // Extract the smallest node from the heap
        let smallestNode = minHeap.dequeue().element;
        current.next = smallestNode;  // Attach it to the merged list
        current = current.next;  // Move to the next node in the merged list
        
        // If the extracted node has a next node, add it to the heap
        if (smallestNode.next) {
            minHeap.enqueue(smallestNode.next);
        }
    }
    
    // Return the merged list starting from the node after the dummy node
    return dummy.next;
};
