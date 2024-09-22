/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {

    if (!head || !head.next) {
        return
    }

    // find middle of the list
    let fast = head
    let slow = head

    while (fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
    }

    // reverse later half of list
    let curr = slow
    let prev = null

    while (curr) {
        let next = curr.next
        curr.next = prev
        prev = curr
        curr = next
    }

    // merge 1st and 2nd half alternatively
    first = head
    second = prev // prev holds the reversed 2nd half

    while (second.next) {
        let temp1 = first.next;
        let temp2 = second.next;

        first.next = second;
        second.next = temp1;

        first = temp1
        second = temp2

    }

};