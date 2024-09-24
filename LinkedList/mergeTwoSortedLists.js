/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {

    const start = new ListNode(0)
    let current = start

    while (list1 && list2) {
        if (list1.val < list2.val) {
            current.next = list1
            list1 = list1.next
        } else {
            current.next = list2
            list2 = list2.next
        }
        current = current.next
    }

    if (list1 == null) {
        current.next = list2
    } else current.next = list1

    return start.next
};

/*
Time and Space Complexity

Time Complexity: O(N + M), where N and M are the lengths of list1 and list2, respectively. Each node is visited exactly once.

Space Complexity: O(1), as it only uses a few extra pointers and modifies the input lists in place without using additional data structures.
*/