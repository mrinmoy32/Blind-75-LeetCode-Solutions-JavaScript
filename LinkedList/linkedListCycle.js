/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */

//Using Floyd's Tortoise and Hare algorithm
var hasCycle = function (head) {

    if (head === null) {
        return false
    }

    let fast = head;
    let slow = head;

    while (fast && fast.next) {
        slow = slow.next
        fast = fast.next.next

        if (slow === fast) {
            return true
        }
    }
    return false
};