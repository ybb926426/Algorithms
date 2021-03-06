链表不需要连续的内存空间，它通过指针将一组零散的内存块串联起来使用，所以申请一个100MB大小的链表，是没有问题的
链表有 单链表、双向链表、循环链表；
- 单链表
  - 单链表有两个节点，一个是头结点，一个是尾节点，头结点用来记录链表的基地址，有了头结点，我们就可以遍历整条链表，而尾节点特殊的地方是，指针指向的null空地址，表示这是链表的最后一个节点
- 循环链表
  - 跟单链表唯一的区别就在于尾节点，循环链表的尾节点指向的链表的头结点
- 双向链表 （常用）例如 java 的 LinkedHashMap
  - 对单链表来说，只有一个方向，节点只有一个后继指针next指向后面的节点；而双向链表支持两个方向，有后继指针next和前驱指针prev；

## 如何用链表实现LRU缓存淘汰策略
- 思路：维护一个有序单链表，越靠近链表尾部的节点是越早之前访问的，当有一个新的数据被访问时，我们从链表投开始排序遍历链表
  - 如果此数据之前已经被缓存在链表中，我们遍历得到这个数据对应的节点，将其从原来的位置删除，然后插入到链表头部
  - 如果次数据没有在缓存列表中，分两种情况
    - 如果此时缓存未满，将此节点直接插入到链表的头部
    - 如果此时缓存已满，则链表尾节点删除，将新的数据节点插入链表头部
  - 时间复杂度 O(n)
  - 实际上，我们可以继续优化这个实现思路，比如移入散列表来记录每个数据的位置，将缓存访问的时间复杂度降为O(1)；