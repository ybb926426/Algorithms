# 队列

队列是一种常见的数据结构,它遵循先进先出(FIFO - First In, First Out)的原则。就像现实生活中排队一样,先进入队列的元素会先被处理或者先被移除

## 主要操作

- 入队(Enqueue):将元素添加到队列的末尾。
- 出队(Dequeue):从队列的前端移除元素。
- 查看队首元素(Front或Peek):获取队列的第一个元素,但不移除它。
- 判断队列是否为空(IsEmpty):检查队列是否为空。
- 获取队列的大小(Size):获取队列中元素的数量

## 实现

队列可以使用数组或链表来实现。使用数组实现的队列称为顺序队列,使用链表实现的队列称为链式队列

## 应用场景

- 缓冲区:队列可以用作缓冲区,存储等待处理的任务或数据。例如,打印机的打印任务队列。
- 广度优先搜索(BFS):在图的遍历中,队列可以用于实现广度优先搜索算法。
- 操作系统中的进程调度:操作系统使用队列来管理等待执行的进程。
- 消息队列:在分布式系统中,消息队列用于在不同组件之间传递消息。
- 事件处理:在事件驱动的系统中,队列可以用于存储等待处理的事件。

## 复杂度

链表的复杂度

- 入队/出队:O(1)
- 查看队首元素:O(1)
- 判断队列是否为空:O(1)
- 获取队列的大小:O(1)

## Queue（队列）

[01. Implement Queue by Array（用数组实现队列）](./01.ArrayQueue)

[02. Implement Queue by LinkedList（用链表实现队列）](./02.LinkedListQueue)

[03. Implement Queue using Stacks（用栈实现队列）](./03.QueueUsingStacks)

[04. Design Circular Deque（设计一个双端队列）](./04.CircularDeque)

[05. Sliding Window Maximum（滑动窗口最大值）](./05.SlidingWindowMaximum)
