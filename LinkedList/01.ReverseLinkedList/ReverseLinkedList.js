/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 方法一 迭代
var reverseList = function(head) {
  if (head == null) return null;
  let prev = null, curr = head; 

  while(curr != null) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
};

// 方法一 递归
// 递归版本比较复杂，关键在于反向工作
var reverseListRecuration = function(head) {
  if (head == null || head.next == null) return head;

  let p = reverseListRecuration(head.next);

  head.next.next = head;
  head.next = null;
  return p;
}