/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

// 这类链表题目一般都是使用双指针法解决的

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
  let fast = head, slow = head;

	while(true) {
		if (fast == null || fast.next == null) return null;
		fast = fast.next.next;
		slow = slow.next;

		if (fast == slow) break;
	}
	fast = head;
	while(fast != slow) {
		slow = slow.next;
		fast = fast.next;
	}
	return fast;
};