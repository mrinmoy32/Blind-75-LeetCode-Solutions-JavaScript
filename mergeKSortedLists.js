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