# 链表(Linked List)

链表是由一系列节点Node组成，每个节点包含数据和指向下一个节点的指针。与数组不同，链表中的元素不是连续存储的，而是通过指针连接在一起

```yaml
+------+    +------+    +------+
| Data | -> | Data | -> | Data | -> NULL
+------+    +------+    +------+
```

## 结构

每个节点包含两个部分

- 数据(Data): 存储节点的实际数据
- 指针(Next)：指向链表中的下一个节点，最后一个节点的指针指向NULL

## 类型

- 单向链表(Singly Linked List)
  - 每个节点只有一个指针，指向链表中的下一个节点。只能从头到尾遍历链表，不能反向遍历
- 双向链表(Doubly Linked List)
  - 每个节点有两个指针，一个是前驱指针prev，一个是后继指针next；可以从头到尾或从尾到头遍历链表
- 循环链表(Circular Linked List)
  - 单向循环链表：最后一个节点的指针指向第一个节点，形成一个环
  - 双向循环链表：最后一个节点的后继指针指向第一个节点，第一个节点的前驱指针指向最后一个节点

## 主要操作

- 插入节点
  - 在链表的头部插入节点：将新节点的指针指向原来的头节点，并将头指针更新为新节点
  - 在链表的中间或尾部插入节点：找到要插入位置的前一个节点，将新节点的指针指向前一个节点的下一个节点，并将前一个节点的指针指向新节点
- 删除节点
  - 删除头节点：将头指针更新尾原来头节点的下一个节点
  - 删除中间或尾节点：找到要删除节点的前一个节点，将前一个节点的指针指向要删除节点的下一个节点
- 查找节点
  - 从头节点开始，遍历链表，逐个比较节点的数据，直到找到目标节点或达到链表的末尾
- 更新节点
  - 找到要更新的节点，修改节点的数据

## 优缺点

优点

- 动态分配内存：链表的大小可以在运行时动态的增加或减少，不需要预先分配固定的内存空间
- 插入和删除效率高：在链表的任意位置插入或山粗节点的时间复杂度为O(1)，只需要修改相邻节点的指针

缺点

- 随机访问效率低：链表中的节点不是连续存储的，无法通过索引直接访问节点，需要从头节点开始遍历
- 额外的内存开销：每个节点需要额外的内存空间来存储指针，相比数组需要更多的内存

## 应用场景

链表适用于需要频繁插入和删除元素的场景，如实现栈、队列、哈希表的冲突链表等数据结构。然而，对于需要频繁随机访问元素的场景，数组可能更加适合

- 实现其他数据结构
  - 链表可以用于实现栈和队列
  - 链表可以用于实现哈希表中的冲突链表，用于解决哈希冲突。
- 内存管理
  - 操作系统中的内存管理可以使用链表来跟踪空闲内存块
  - 内存池的实现可以使用链表来管理内存块
- 图的表示
  - 邻接表表示法使用链表来存储图中每个顶点的相邻顶点。
- 多项式表示
  - 多项式的非零项可以使用链表来表示，每个节点存储系数和指数
- 稀疏矩阵
  - 稀疏矩阵中的非零元素可以使用链表来存储，每个节点存储元素的值和位置信息

链表不需要连续的内存空间，它通过指针将一组零散的内存块串联起来使用，所以申请一个100MB大小的链表，是没有问题的

### 如何用链表实现LRU缓存淘汰策略

- 思路：维护一个有序单链表，越靠近链表尾部的节点是越早之前访问的，当有一个新的数据被访问时，我们从链表投开始排序遍历链表
  - 如果此数据之前已经被缓存在链表中，我们遍历得到这个数据对应的节点，将其从原来的位置删除，然后插入到链表头部
  - 如果次数据没有在缓存列表中，分两种情况
    - 如果此时缓存未满，将此节点直接插入到链表的头部
    - 如果此时缓存已满，则链表尾节点删除，将新的数据节点插入链表头部
  - 时间复杂度 O(n)
  - 实际上，我们可以继续优化这个实现思路，比如移入散列表来记录每个数据的位置，将缓存访问的时间复杂度降为O(1)；
